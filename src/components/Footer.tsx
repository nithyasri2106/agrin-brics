import React from 'react';
import { Leaf, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-900 bg-slate-950/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">AgriN-BRICS</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
                Digital Public Good
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              An interoperable digital agriculture network designed to empower small and marginal farmers with real-time agro-advisories, satellite NDVI telemetry, regenerative polyculture planning, and multimodal crop pathology. Inspired by the BRICS AgriN initiative.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified under Digital Public Goods Standard v1.4 • Open Source (MIT)</span>
            </div>
          </div>

          {/* Cooperating Research Agencies */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Cooperating BRICS Agencies
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <span>🇮🇳</span> <span>ICAR (India)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <span>🇧🇷</span> <span>EMBRAPA (Brazil)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <span>🇿🇦</span> <span>ARC (South Africa)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <span>🇨🇳</span> <span>CAAS (China)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <span>🇷🇺</span> <span>RAS / VIZR (Russia)</span>
              </li>
            </ul>
          </div>

          {/* Hackathon Track Info */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Hackathon Context
            </h4>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">Competition:</span>
                <span className="text-emerald-300 font-medium">Build with AI: Code for Communities</span>
              </div>
              <div>
                <span className="text-slate-400 block">Challenge Track:</span>
                <span className="text-white font-medium">Track 4 — AgriN & Regenerative Intelligence</span>
              </div>
              <div>
                <span className="text-slate-400 block">Core Theme:</span>
                <span className="text-emerald-400 font-semibold">BRICS Multilateral Cooperation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © 2026 AgriN-BRICS Initiative • Built for Sustainable Food Security & Soil Restoration.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Node 402 Operational
            </span>
            <span>REST API v1.4</span>
            <span>Open Data (GeoJSON)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
