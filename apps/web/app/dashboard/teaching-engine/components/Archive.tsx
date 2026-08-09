'use client';

import { useEffect, useState } from 'react';

interface ArchiveProps {
  onSelectProcess: (process: any) => void;
}

export default function Archive({ onSelectProcess }: ArchiveProps) {
  const [processes, setProcesses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/teaching-engine/process');
      const data = await response.json();
      setProcesses(data.processes || []);
    } catch (err) {
      console.error('Failed to fetch processes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = processes.filter((p) =>
    p.sermonTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search sermons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-600">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No sermons found
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((process) => (
            <div
              key={process.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => onSelectProcess(process)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {process.sermonTitle}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(process.createdAt).toLocaleDateString()}{' '}
                    at{' '}
                    {new Date(process.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {process.status}
                </span>
              </div>

              {process.publishedPosts && (
                <div className="mt-3 text-xs text-gray-600">
                  📊 {process.publishedPosts.length} posts published
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
