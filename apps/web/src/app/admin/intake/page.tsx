'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface EntryRequest {
  id: string;
  name: string;
  contact: string;
  country?: string;
  situation: string;
  seeking: string[];
  story: string;
  readiness: string;
  status: string;
  decisionMade: boolean;
  decision?: string;
  createdAt: string;
  encounteredBy?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export default function IntakePage() {
  const router = useRouter();
  const [entries, setEntries] = useState<EntryRequest[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<EntryRequest | null>(null);
  const [decision, setDecision] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  // Fetch entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (searchTerm) params.append('search', searchTerm);
        params.append('limit', '20');

        const res = await fetch(`/api/admin/intake?${params}`, {
          method: 'GET'
        });

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/auth/signin');
            return;
          }
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setEntries(data.entries);
        setPagination(data.pagination);
      } catch (err) {
        console.error('[INTAKE] Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load entries');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [statusFilter, searchTerm, router]);

  const handleUpdateEntry = async (status: string, decidedYes: boolean) => {
    if (!selectedEntry) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/admin/intake/${selectedEntry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          decisionMade: decidedYes,
          decision: decidedYes ? 'yes' : 'no'
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log('[INTAKE] Entry updated:', data.entry.id);

      // Refresh list
      setSelectedEntry(null);
      setDecision('');
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      const refreshRes = await fetch(`/api/admin/intake?${params}`);
      const refreshData = await refreshRes.json();
      setEntries(refreshData.entries);
      setPagination(refreshData.pagination);
    } catch (err) {
      console.error('[INTAKE] Update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update entry');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F6F2', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          style={{ marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <h1 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Ministry Intake
          </h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            Review and respond to prayer requests from seekers
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">All Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="RECEIVED">Received</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            style={{ backgroundColor: '#fee', border: '1px solid #fcc', color: '#c33', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
          >
            {error}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            Loading entries...
          </div>
        )}

        {/* Entries List */}
        {!loading && entries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
            No entries found
          </div>
        )}

        {!loading && entries.length > 0 && (
          <motion.div
            style={{ backgroundColor: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Contact</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Readiness</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Submitted</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{entry.name}</td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>{entry.contact}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        backgroundColor: entry.status === 'COMPLETED' ? '#d4edda' : entry.status === 'SCHEDULED' ? '#fff3cd' : '#e2e3e5',
                        color: entry.status === 'COMPLETED' ? '#155724' : entry.status === 'SCHEDULED' ? '#856404' : '#383d41'
                      }}>
                        {entry.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{entry.readiness}</td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#999' }}>
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#0F766E',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0a5c59')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0F766E')}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Pagination */}
        {pagination && pagination.hasMore && (
          <motion.div
            style={{ textAlign: 'center', marginTop: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <button
              onClick={() => {
                // Load more - would implement infinite scroll or pagination
              }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0F766E',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Load More
            </button>
          </motion.div>
        )}

        {/* Detail Modal */}
        {selectedEntry && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEntry(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#999'
                }}
                aria-label="Close"
              >
                &times;
              </button>

              <h2 style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                {selectedEntry.name}
              </h2>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Contact</label>
                  <p style={{ color: '#666' }}>{selectedEntry.contact}</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Country</label>
                  <p style={{ color: '#666' }}>{selectedEntry.country || 'Not specified'}</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Situation</label>
                  <p style={{ color: '#666', textTransform: 'capitalize' }}>{selectedEntry.situation.replace(/_/g, ' ')}</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Their Story</label>
                  <p style={{ color: '#666', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{selectedEntry.story || 'No story provided'}</p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>What They&apos;re Seeking</label>
                  <p style={{ color: '#666' }}>
                    {selectedEntry.seeking.length > 0
                      ? selectedEntry.seeking.map(s => s.replace(/_/g, ' ')).join(', ')
                      : 'Not specified'}
                  </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Readiness</label>
                  <p style={{ color: '#666', textTransform: 'capitalize' }}>{selectedEntry.readiness.replace(/_/g, ' ')}</p>
                </div>

                <div style={{ marginBottom: '2rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Decision After Encounter</label>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '0.375rem',
                      fontSize: '1rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <option value="">Select decision...</option>
                    <option value="yes">Yes - Ready to walk restoration</option>
                    <option value="no">No - Not ready</option>
                    <option value="need_more_time">Need more time</option>
                  </select>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => handleUpdateEntry('SCHEDULED', decision === 'yes')}
                      disabled={!decision || updating}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: decision ? '#0F766E' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: decision ? 'pointer' : 'not-allowed',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => {
                        if (decision) (e.currentTarget.style.backgroundColor = '#0a5c59');
                      }}
                      onMouseLeave={(e) => {
                        if (decision) (e.currentTarget.style.backgroundColor = '#0F766E');
                      }}
                    >
                      {updating ? 'Updating...' : 'Record Encounter'}
                    </button>
                    <button
                      onClick={() => setSelectedEntry(null)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#eee',
                        color: '#333',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
