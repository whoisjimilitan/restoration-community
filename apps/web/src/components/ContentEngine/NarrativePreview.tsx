interface NarrativePreviewProps {
  narrative: string;
  elements: {
    revelation: string;
    contrast: string;
    coreMessage: string;
    identityChoice: string;
    callToAction: string;
  };
}

export function NarrativePreview({ narrative, elements }: NarrativePreviewProps) {
  return (
    <div className="space-y-6 bg-rc-warm-gray p-8 rounded-lg border border-rc-border/30">
      <div>
        <h3 className="text-lg font-bold text-rc-text mb-3">Expanded Narrative</h3>
        <p className="text-sm text-rc-text leading-relaxed whitespace-pre-wrap">
          {narrative}
        </p>
      </div>

      <div className="border-t border-rc-border/30 pt-6 space-y-4">
        <h3 className="text-lg font-bold text-rc-text">Extracted Elements</h3>

        <div>
          <label className="text-xs font-medium text-rc-text/60 uppercase">Revelation</label>
          <p className="text-sm text-rc-text mt-1">{elements.revelation}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-rc-text/60 uppercase">Contrast</label>
          <p className="text-sm text-rc-text mt-1">{elements.contrast}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-rc-text/60 uppercase">Core Message</label>
          <p className="text-sm text-rc-text mt-1">{elements.coreMessage}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-rc-text/60 uppercase">Identity Choice</label>
          <p className="text-sm text-rc-text mt-1">{elements.identityChoice}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-rc-text/60 uppercase">Call to Action</label>
          <p className="text-sm text-rc-text mt-1">{elements.callToAction}</p>
        </div>
      </div>
    </div>
  );
}
