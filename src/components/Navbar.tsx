import React from 'react';
import { Leaf, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { BRICS_NATIONS, TRANSLATIONS } from '../data/mockData';
import type { NationCode, LanguageCode } from '../types';

interface NavbarProps {
  currentNation: NationCode;
  onSelectNation: (nation: NationCode) => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentNation,
  onSelectNation,
  currentLang,
  onSelectLang,
  activeTab,
  onSelectTab
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const tabs = [
    { id: 'advisory', label: t.navAdvisory, icon: '🌾' },
    { id: 'satellite', label: t.navSatellite, icon: '🛰️' },
    { id: 'crops', label: t.navCrops, icon: '🌿' },
    { id: 'doctor', label: t.navDoctor, icon: '🔬' },
    { id: 'interoperability', label: t.navInteroperability, icon: '🌐' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-emerald-900/30">
      {/* Hackathon Top Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 border-b border-emerald-800/40 px-4 py-1.5 text-xs text-emerald-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 text-[11px] font-semibold tracking-wide uppercase">
              BRICS AgriN
            </span>
            <span>Track 4 — AgriN & Regenerative Agricultural Intelligence</span>
            <span className="hidden md:inline text-emerald-400/60">•</span>
            <span className="hidden md:inline text-emerald-300">Theme: Multilateral Cooperation</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-300/90 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-mono">Mesh Node #402: Live & Interoperable</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-300/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DPG Certified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand & Country Selector */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('advisory')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/40 border border-emerald-400/30">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent m-0">
                AgriN-BRICS
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v2.4 Open Good
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.subtagline}
            </p>
          </div>
        </div>

        {/* BRICS Member Nations Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium px-2 hidden lg:inline flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            Member:
          </span>
          {BRICS_NATIONS.map((nation) => {
            const isActive = currentNation === nation.code;
            return (
              <button
                key={nation.code}
                onClick={() => onSelectNation(nation.code)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={`${nation.name} (${nation.primaryZone})`}
              >
                <span className="text-base leading-none">{nation.flag}</span>
                <span className="hidden sm:inline">{nation.code}</span>
              </button>
            );
          })}
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2">
          <select
            value={currentLang}
            onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="en">English (Global)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="pt">Português (Brasil)</option>
            <option value="zh">中文 (Mandarin)</option>
            <option value="ru">Русский (Russian)</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 flex gap-1 border-t border-slate-900 overflow-x-auto scrollbar-none py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.id === 'doctor' && (
                <span className="flex items-center gap-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full font-bold">
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
