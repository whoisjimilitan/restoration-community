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
    <div className="min-h-screen bg-rc-bg">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <h1 className="text-4xl font-rc-serif font-bold text-rc-text tracking-tight mb-2">
            Intake
          </h1>
          <p className="text-rc-text/60">
            Review prayer requests
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-3 border border-rc-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rc-accent"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-rc-border rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-rc-accent"
          >
            <option value="">All Status</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="RECEIVED">Received</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
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
          <div className="text-center py-12 text-rc-text/60">
            Loading entries...
          </div>
        )}

        {/* Entries List */}
        {!loading && entries.length === 0 && (
          <div className="text-center py-12 text-rc-text/40">
            No entries found
          </div>
        )}

        {!loading && entries.length > 0 && (
          <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-rc-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-rc-bg border-b border-rc-border">
                  <th className="px-4 py-3 text-left font-bold text-sm text-rc-text">Name</th>
                  <th className="px-4 py-3 text-left font-bold text-sm text-rc-text">Contact</th>
                  <th className="px-4 py-3 text-left font-bold text-sm text-rc-text">Status</th>
                  <th className="px-4 py-3 text-left font-bold text-sm text-rc-text">Readiness</th>
                  <th className="px-4 py-3 text-left font-bold text-sm text-rc-text">Submitted</th>
                  <th className="px-4 py-3 text-center font-bold text-sm text-rc-text">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-rc-border/50 hover:bg-rc-bg/50 transition-colors">
                    <td className="px-4 py-3 text-rc-text">{entry.name}</td>
                    <td className="px-4 py-3 text-sm text-rc-text/60">{entry.contact}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        entry.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        entry.status === 'SCHEDULED' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-rc-text">{entry.readiness}</td>
                    <td className="px-4 py-3 text-sm text-rc-text/50">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="px-4 py-2 bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
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
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <button
              onClick={() => {
                // Load more - would implement infinite scroll or pagination
              }}
              className="px-6 py-3 bg-rc-accent text-white font-bold rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Load More
            </button>
          </motion.div>
        )}

        {/* Detail Modal */}
        {selectedEntry && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEntry(null)}
                className="absolute top-4 right-4 text-rc-text/40 hover:text-rc-text transition-colors text-2xl hover:scale-110"
                aria-label="Close"
              >
                &times;
              </button>

              <h2 className="text-2xl font-rc-serif font-bold text-rc-text tracking-tight mb-6">
                {selectedEntry.name}
              </h2>

              <div className="mb-8">
                <div className="mb-4">
                  <label className="block font-bold text-rc-text mb-1">Contact</label>
                  <p className="text-rc-text/60">{selectedEntry.contact}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-rc-text mb-1">Country</label>
                  <p className="text-rc-text/60">{selectedEntry.country || 'Not specified'}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-rc-text mb-1">Situation</label>
                  <p className="text-rc-text/60 capitalize">{selectedEntry.situation.replace(/_/g, ' ')}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-rc-text mb-1">Story</label>
                  <p className="text-rc-text/60 leading-relaxed whitespace-pre-wrap">{selectedEntry.story || 'Not provided'}</p>
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-rc-text mb-1">Seeking</label>
                  <p className="text-rc-text/60">
                    {selectedEntry.seeking.length > 0
                      ? selectedEntry.seeking.map(s => s.replace(/_/g, ' ')).join(', ')
                      : 'Not specified'}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-rc-text mb-1">Readiness</label>
                  <p className="text-rc-text/60 capitalize">{selectedEntry.readiness.replace(/_/g, ' ')}</p>
                </div>

                <div className="mb-8 pt-4 border-t border-rc-border">
                  <label className="block font-bold text-rc-text mb-2">Decision</label>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    className="w-full px-4 py-3 border border-rc-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rc-accent mb-4"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes - Ready to walk restoration</option>
                    <option value="no">No - Not ready</option>
                    <option value="need_more_time">Need more time</option>
                  </select>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleUpdateEntry('SCHEDULED', decision === 'yes')}
                      disabled={!decision || updating}
                      className={`flex-1 px-4 py-3 font-bold rounded-lg transition-all duration-300 ${
                        decision
                          ? 'bg-rc-accent text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {updating ? 'Saving...' : 'Record'}
                    </button>
                    <button
                      onClick={() => setSelectedEntry(null)}
                      className="flex-1 px-4 py-3 bg-rc-bg text-rc-text font-bold rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-rc-border"
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
