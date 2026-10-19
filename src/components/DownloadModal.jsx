import React, { useEffect } from 'react';
import { X, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.papercode.echo';

export default function DownloadModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const onKey = (e) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PLAY_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-sm bg-[#141414] border border-[#222] rounded-2xl p-6 shadow-2xl z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#666] hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img src="/assets/icons/app_logo.png" alt="Echo" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <h3 className="text-white font-semibold">Echo</h3>
            <p className="text-xs text-[#666]">echosocialconnect</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF9500] text-black font-semibold text-sm hover:bg-[#E68600] transition-colors"
          >
            <Download className="w-4 h-4" />
            Open in Google Play
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-sm text-[#999] hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy link
              </>
            )}
          </button>
        </div>

        <p className="mt-5 text-center text-[10px] text-[#444]">
          com.papercode.echo • Free on Google Play
        </p>
      </div>
    </div>
  );
}
