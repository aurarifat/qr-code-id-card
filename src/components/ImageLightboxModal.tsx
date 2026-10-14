import React, { useEffect } from 'react';
import { X, ExternalLink, Maximize2 } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  subtitle?: string;
  aspectRatio?: string;
  sourceUrl?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  subtitle,
  aspectRatio = '16:9',
  sourceUrl,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Container */}
      <div
        className="relative max-w-5xl w-full bg-[#0D0D0D] border border-[#FF6500]/40 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FF6500]/20 text-[#FF7A1A]">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs font-mono text-[#858585]">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#858585] hover:text-[#FF7A1A] transition-colors"
                title="Open Source Link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-[#FF6500] hover:text-black text-white transition-colors focus:outline-none"
              aria-label="Close high resolution viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Frame */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="max-h-[74vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#121212] flex items-center justify-between text-xs font-mono text-[#858585]">
          <span>Full HD • No Blur Crisp Resolution</span>
          <span className="text-[#FF7A1A]">Aura RIFAT Official Portfolio</span>
        </div>
      </div>
    </div>
  );
};
