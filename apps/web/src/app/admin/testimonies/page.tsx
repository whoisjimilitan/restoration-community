'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FormattedTestimony } from '@/lib/testimony-helpers';

interface TestimonyFormData {
  name: string;
  role: string;
  stage: number;
  quote: string;
  story: string;
}

const initialFormData: TestimonyFormData = {
  name: '',
  role: '',
  stage: 6,
  quote: '',
  story: '',
};

export default function AdminTestimoniesPage() {
  const [testimonies, setTestimonies] = useState<FormattedTestimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TestimonyFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      const response = await fetch('/api/testimonies');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setTestimonies(data.testimonies || []);
    } catch (error) {
      console.error('[ADMIN] Error fetching testimonies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        stage: parseInt(formData.stage.toString()),
      };

      const response = await fetch(
        editingId ? `/api/admin/testimonies/${editingId}` : '/api/admin/testimonies',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error('Failed to save testimony');

      console.log(`[ADMIN] Testimony ${editingId ? 'updated' : 'created'} successfully`);
      await fetchTestimonies();
      setFormData(initialFormData);
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('[ADMIN] Error saving testimony:', error);
      alert('Failed to save testimony');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimony?')) return;

    try {
      const response = await fetch(`/api/admin/testimonies/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      console.log('[ADMIN] Testimony deleted:', id);
      setTestimonies(testimonies.filter((t) => t.id !== id));
    } catch (error) {
      console.error('[ADMIN] Error deleting testimony:', error);
      alert('Failed to delete testimony');
    }
  };

  const handleEdit = (testimony: FormattedTestimony) => {
    setFormData({
      name: testimony.name,
      role: testimony.role,
      stage: testimony.stage,
      quote: testimony.quote,
      story: testimony.story,
    });
    setEditingId(testimony.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-rc-bg">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-rc-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-rc-serif font-bold text-rc-text">Testimonies Manager</h1>
              <p className="text-rc-text/60 mt-2">Create and manage restoration testimonies</p>
            </div>
            <button
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-6 py-2 bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              {showForm ? 'Cancel' : '+ New Testimony'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      {showForm && (
        <motion.div
          className="bg-white border-b border-rc-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-12">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-rc-text mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-accent"
                  placeholder="Testimony person's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-rc-text mb-2">Role</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-accent"
                  placeholder="e.g., Former Scammer, Student"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-rc-text mb-2">Stage (1-7)</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-accent"
                >
                  <option value={1}>1 - Truth</option>
                  <option value={2}>2 - Confession</option>
                  <option value={3}>3 - Repentance</option>
                  <option value={4}>4 - Forgiveness</option>
                  <option value={5}>5 - Reconciliation</option>
                  <option value={6}>6 - Honest Work</option>
                  <option value={7}>7 - Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-rc-text mb-2">Quote</label>
                <textarea
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-accent"
                  placeholder="Key quote from the testimony"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-rc-text mb-2">Story</label>
                <textarea
                  required
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="w-full px-4 py-2 border border-rc-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rc-accent"
                  placeholder="Full transformation story"
                  rows={6}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Testimony' : 'Create Testimony'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-rc-border text-rc-text font-medium rounded-lg hover:bg-rc-bg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Testimonies List */}
      <motion.div
        className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        {loading ? (
          <div className="text-center py-12">
            <p className="text-rc-text/60">Loading testimonies...</p>
          </div>
        ) : testimonies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-rc-text/60 text-lg mb-4">No testimonies yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-rc-accent text-white font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Create First Testimony
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {testimonies.map((testimony) => (
              <div
                key={testimony.id}
                className="bg-white rounded-lg border border-rc-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-rc-serif font-bold text-rc-text">{testimony.name}</h3>
                      <span className="px-2 py-1 bg-rc-accent/10 text-rc-accent text-xs font-medium rounded">
                        Stage {testimony.stage}
                      </span>
                    </div>
                    <p className="text-sm text-rc-text/60 mb-3">{testimony.role}</p>
                    <p className="text-sm text-rc-text/70 line-clamp-2">
                      &ldquo;{testimony.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(testimony)}
                      className="px-4 py-2 border border-rc-border text-rc-text font-medium rounded-lg hover:bg-rc-bg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimony.id)}
                      className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
