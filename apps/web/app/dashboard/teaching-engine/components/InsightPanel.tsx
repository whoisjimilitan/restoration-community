'use client';

import { useState } from 'react';

export interface InsightPanelProps {
  process: {
    verbatimElements: any[];
    reasoning: {
      sentenceAnalyses: any[];
      triviumAnalysis: {
        hiddenTruths: string[];
      };
      validation: {
        scripture: {
          supportingVerses: string[];
        };
      };
      holisticInsight: string;
    };
  };
}

export default function InsightPanel({ process }: InsightPanelProps) {
  const [expandedTab, setExpandedTab] = useState<
    'statements' | 'truths' | 'verses' | 'insight'
  >('statements');

  const verbatimStatements = process.verbatimElements.filter(
    (v) => v.type === 'statement'
  );
  const hiddenTruths = process.reasoning.triviumAnalysis.hiddenTruths || [];
  const verses =
    process.reasoning.validation.scripture.supportingVerses || [];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Teaching Insights
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {[
          { key: 'statements' as const, label: `Statements (${verbatimStatements.length})` },
          { key: 'truths' as const, label: `Hidden Truths (${hiddenTruths.length})` },
          { key: 'verses' as const, label: `Scripture (${verses.length})` },
          { key: 'insight' as const, label: 'Holistic Insight' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setExpandedTab(tab.key)
            }
            className={`px-4 py-3 font-medium border-b-2 transition ${
              expandedTab === tab.key
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {expandedTab === 'statements' && (
          <div className="space-y-3">
            {verbatimStatements.map((stmt, i) => (
              <div
                key={i}
                className="p-3 bg-white border border-gray-300 rounded text-sm"
              >
                <span className="font-mono text-xs text-gray-500">
                  [{stmt.strength}]
                </span>
                <p className="mt-1 text-gray-900">{stmt.text}</p>
              </div>
            ))}
          </div>
        )}

        {expandedTab === 'truths' && (
          <div className="space-y-3">
            {hiddenTruths.length > 0 ? (
              hiddenTruths.map((truth, i) => (
                <div key={i} className="p-3 bg-white border border-gray-300 rounded">
                  <p className="text-sm text-gray-900">{truth}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">No hidden truths extracted</p>
            )}
          </div>
        )}

        {expandedTab === 'verses' && (
          <div className="space-y-3">
            {verses.length > 0 ? (
              verses.map((verse, i) => (
                <div key={i} className="p-3 bg-white border border-gray-300 rounded text-sm font-mono">
                  {verse}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">No verses referenced</p>
            )}
          </div>
        )}

        {expandedTab === 'insight' && (
          <div className="p-4 bg-white border border-gray-300 rounded text-sm leading-relaxed text-gray-900">
            {process.reasoning.holisticInsight}
          </div>
        )}
      </div>
    </div>
  );
}
