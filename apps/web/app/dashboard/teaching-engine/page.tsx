'use client';

import { useState } from 'react';
import UploadZone from './components/UploadZone';
import ProcessingIndicator from './components/ProcessingIndicator';
import InsightPanel from './components/InsightPanel';
import OutputGallery from './components/OutputGallery';
import Archive from './components/Archive';

export default function TeachingEngineDashboard() {
  const [activeTab, setActiveTab] = useState<'new' | 'archive'>('new');
  const [currentProcess, setCurrentProcess] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Teaching Engine
        </h1>
        <p className="mt-2 text-gray-600">
          Transform sermons into 7 publication-ready formats for all platforms
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 px-8">
        <div className="flex gap-8">
          <button
            onClick={() => {
              setActiveTab('new');
              setCurrentProcess(null);
            }}
            className={`py-4 font-medium border-b-2 transition ${
              activeTab === 'new'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            New Sermon
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`py-4 font-medium border-b-2 transition ${
              activeTab === 'archive'
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Archive
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {activeTab === 'new' ? (
          <div>
            {!currentProcess ? (
              <UploadZone
                onUpload={(process) => {
                  setCurrentProcess(process);
                }}
              />
            ) : (
              <div className="space-y-8">
                {/* Processing Status */}
                <ProcessingIndicator process={currentProcess} />

                {/* Insights Panel */}
                {currentProcess.status === 'complete' && (
                  <>
                    <InsightPanel process={currentProcess} />
                    <OutputGallery
                      process={currentProcess}
                      onUpdate={setCurrentProcess}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <Archive onSelectProcess={setCurrentProcess} />
        )}
      </div>
    </div>
  );
}
