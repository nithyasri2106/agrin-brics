import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { AgroAdvisory } from './components/AgroAdvisory';
import { SatelliteSoilHub } from './components/SatelliteSoilHub';
import { CropRecommender } from './components/CropRecommender';
import { DiseaseDoctor } from './components/DiseaseDoctor';
import { BricsInteroperability } from './components/BricsInteroperability';
import { Footer } from './components/Footer';
import { 
  BRICS_NATIONS, 
  NATION_WEATHER, 
  NATION_SOIL, 
  NATION_NDVI_ZONES
} from './data/mockData';
import type { NationCode, LanguageCode } from './types';
import { Users, TrendingUp, Droplets, ShieldCheck } from 'lucide-react';

export function App() {
  const [currentNationCode, setCurrentNationCode] = useState<NationCode>('IN');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('advisory');

  const currentNation = BRICS_NATIONS.find((n) => n.code === currentNationCode) || BRICS_NATIONS[0];
  const currentWeather = NATION_WEATHER[currentNationCode] || NATION_WEATHER.IN;
  const currentSoil = NATION_SOIL[currentNationCode] || NATION_SOIL.IN;
  const currentNdviZones = NATION_NDVI_ZONES[currentNationCode] || NATION_NDVI_ZONES.IN;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentNation={currentNationCode}
        onSelectNation={setCurrentNationCode}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Core Global Metric Impact Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white">120M+</div>
              <div className="text-[11px] text-slate-400">Smallholders Empowered</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-teal-300">+42% SOC</div>
              <div className="text-[11px] text-slate-400">Soil Carbon Accrual</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-cyan-300">-48% Water</div>
              <div className="text-[11px] text-slate-400">Via Living Residue Mulch</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-indigo-300">100% DPG</div>
              <div className="text-[11px] text-slate-400">Digital Public Good Mesh</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher Body */}
        {activeTab === 'advisory' && (
          <AgroAdvisory
            nation={currentNation}
            weather={currentWeather}
            lang={currentLang}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'satellite' && (
          <SatelliteSoilHub
            nation={currentNation}
            initialSoil={currentSoil}
            ndviZones={currentNdviZones}
          />
        )}

        {activeTab === 'crops' && (
          <CropRecommender nation={currentNation} />
        )}

        {activeTab === 'doctor' && (
          <DiseaseDoctor />
        )}

        {activeTab === 'interoperability' && (
          <BricsInteroperability />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
