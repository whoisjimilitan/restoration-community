interface FormatSelectorProps {
  selectedFormat: string;
  onSelect: (format: string) => void;
  availableFormats: string[];
}

const FORMAT_LABELS: Record<string, { label: string; description: string }> = {
  dailyLetter: {
    label: 'Daily Letter',
    description: '2-3 paragraphs, personal address',
  },
  socialPost: {
    label: 'Social Post',
    description: '<280 characters, hook + revelation',
  },
  microInsight: {
    label: 'Micro Insight',
    description: '1-2 sentences, pure distillation',
  },
  devotional: {
    label: 'Devotional',
    description: '3-4 sentences, meditative',
  },
  article: {
    label: 'Article',
    description: '500-800 words, structured',
  },
  shortVideo: {
    label: 'Short Video',
    description: 'Script <60 seconds',
  },
  longVideo: {
    label: 'Long Video',
    description: 'Script 5-15 minutes',
  },
  podcastMoment: {
    label: 'Podcast Moment',
    description: '1-2 min excerpt, conversational',
  },
  email: {
    label: 'Email',
    description: 'Extended form, personal tone',
  },
};

export function FormatSelector({
  selectedFormat,
  onSelect,
  availableFormats,
}: FormatSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-rc-text">Select Format</h2>
      <div className="grid grid-cols-2 gap-3">
        {availableFormats.map((format) => {
          const info = FORMAT_LABELS[format] || { label: format, description: '' };
          const isSelected = selectedFormat === format;

          return (
            <button
              key={format}
              onClick={() => onSelect(format)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? 'border-rc-accent bg-rc-accent/10'
                  : 'border-rc-border/30 bg-rc-warm-gray hover:border-rc-border/60'
              }`}
            >
              <div className="font-medium text-rc-text text-sm">{info.label}</div>
              <div className="text-xs text-rc-text/60 mt-1">{info.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
