import React, { useState } from 'react';
import { 
  CloudSun, Droplets, Wind, SunMedium, Gauge, Calendar, 
  Send, Sparkles, Volume2, VolumeX,
  ArrowRight, Sprout, Bot
} from 'lucide-react';
import type { BricsNation, WeatherData, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/mockData';

interface AgroAdvisoryProps {
  nation: BricsNation;
  weather: WeatherData;
  lang: LanguageCode;
  onNavigateTab: (tab: string) => void;
}

export const AgroAdvisory: React.FC<AgroAdvisoryProps> = ({
  nation,
  weather,
  lang,
  onNavigateTab
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; timestamp: string }>>([
    {
      sender: 'ai',
      text: `Namaste / Olá / Привет! I am your AgriN Regenerative Advisor for **${nation.name}** (${nation.primaryZone}). How can I help optimize your soil carbon, natural pest control, or irrigation schedule today?`,
      timestamp: 'Just now'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const samplePrompts = [
    `How do I restore degraded ${nation.soilType.split(' ')[0]} soil without chemical urea?`,
    `What are the best companion crops for ${nation.primaryCrops[0]}?`,
    `How do I prepare bio-fertilizer like Jeevamrutha or Bokashi?`,
    `What should I do during the upcoming dry spell?`
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || userInput;
    if (!text.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user' as const, text, timestamp: 'Now' }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsThinking(true);

    setTimeout(() => {
      let aiReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('urea') || lower.includes('nitrogen') || lower.includes('soil')) {
        aiReply = `### 🌱 Regenerative Soil Protocol for ${nation.name} (${nation.primaryZone}):
1. **Biological Nitrogen Fixation**: Plant a companion legume like **Cowpea, Sunnhemp, or Chickpeas** alongside ${nation.primaryCrops[0]}. This can fix **50–85 kg atmospheric N/ha** directly at root depth.
2. **Inoculation**: Seed coat with **Rhizobium / Azotobacter** and **Mycorrhizal spores** before sowing to unlock fixed soil phosphorus.
3. **Organic Carbon Accrual**: Spread 5 tons/ha of composted farmyard manure mixed with **5% biochar**. This acts like a sponge, retaining 30% more moisture in ${nation.soilType}.
4. **Residue Management**: Never burn stubble! Direct drill seeds into standing crop residues to feed earthworms and soil fungi.`;
      } else if (lower.includes('companion') || lower.includes('crop') || lower.includes('intercrop')) {
        aiReply = `### 🌾 Agro-Ecological Companion Matrix:
- **Primary Cash Crop**: ${nation.primaryCrops[0]}
- **Ideal Companion Legume**: ${nation.primaryCrops[1] || 'Cowpea / Pigeon Pea'}
- **Cover Crop Carpet**: Sunnhemp (*Crotalaria juncea*) or Brachiaria grass.
- **Why this works**: The legume fixes atmospheric nitrogen, suppresses weed emergence by 60%, and the root exudates stimulate mycorrhizal networks that protect the primary crop against drought stress.`;
      } else if (lower.includes('jeevamrutha') || lower.includes('bokashi') || lower.includes('bio-fertilizer')) {
        aiReply = `### 🥣 Step-by-Step Bio-Inoculant Preparation:
1. **Ingredients**: 10 kg native cow dung, 5–10L cow urine, 2 kg jaggery, 2 kg pulse flour (gram/chickpea), and a handful of fertile forest soil in 200L water.
2. **Fermentation**: Stir clockwise twice daily for 48 hours in the shade. Keep covered with a damp jute bag.
3. **Application**: Apply 200L/ha through drip irrigation or flood furrow every 15–21 days.
4. **Impact**: Delivers over 1 billion beneficial colony-forming units (CFUs) of Bacillus, Pseudomonas, and actinomycetes per mL!`;
      } else {
        aiReply = `### 🌍 AgriN Local Advisory for ${nation.name}:
- **Current Agro-Zone**: ${nation.primaryZone}
- **Weather Context**: ${weather.temp}°C, Humidity: ${weather.humidity}%, ET Rate: ${weather.evapotranspiration} mm/day.
- **Immediate Farm Action**: Mulch the base of your plants with biomass residues to minimize evapotranspiration losses. Monitor field borders for transboundary pest migration. Inoculate root zones with Trichoderma bio-fungicide during the morning irrigation window.`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply, timestamp: 'Just now' }]);
      setIsThinking(false);
    }, 900);
  };

  const toggleSpeak = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="space-y-6">
      {/* Country Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/60 rounded-2xl p-6 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{nation.flag}</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {nation.name} <span className="text-emerald-400 text-lg font-normal">({nation.nativeName})</span>
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {nation.climateType}
              </span>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl">
              Agro-Ecological Corridor: <strong className="text-emerald-300">{nation.primaryZone}</strong> • Soil Profile: <strong className="text-slate-200">{nation.soilType}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('satellite')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>🛰️ Satellite Health</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
            <button
              onClick={() => onNavigateTab('crops')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white shadow-md shadow-emerald-950 flex items-center gap-1.5 transition-all"
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>Regenerative Crops</span>
            </button>
          </div>
        </div>
      </div>

      {/* Weather & Live Climate Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Air Temp</span>
            <SunMedium className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{weather.temp}°C</div>
            <div className="text-[11px] text-emerald-400 font-medium">{weather.condition}</div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Rel Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{weather.humidity}%</div>
            <div className="text-[11px] text-cyan-300">
              {weather.humidity > 65 ? 'High fungal sporulation' : 'Optimal transpiration'}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Precipitation Risk</span>
            <CloudSun className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{weather.precipitationChance}%</div>
            <div className="text-[11px] text-slate-400">Next 24h probability</div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Wind Velocity</span>
            <Wind className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{weather.windSpeed} <span className="text-xs font-normal text-slate-400">km/h</span></div>
            <div className="text-[11px] text-slate-400">
              {weather.windSpeed > 15 ? 'Drift risk: avoid spray' : 'Gentle canopy breeze'}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Solar Radiation</span>
            <SunMedium className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{weather.solarRadiation} <span className="text-xs font-normal text-slate-400">W/m²</span></div>
            <div className="text-[11px] text-emerald-400">Active photosynthesis</div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Evapotranspiration</span>
            <Gauge className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{weather.evapotranspiration} <span className="text-xs font-normal text-slate-400">mm/d</span></div>
            <div className="text-[11px] text-amber-300">Mulch conservation key</div>
          </div>
        </div>
      </div>

      {/* 7-Day Regenerative Advisory Timeline */}
      <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white">
              7-Day Regenerative Farm Action Window
            </h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
            Synchronized with Copernicus Ag-Met Feed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast.map((day, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all ${
                idx === 0
                  ? 'bg-emerald-950/40 border-emerald-600/50 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className={idx === 0 ? 'text-emerald-400' : 'text-slate-300'}>{day.day}</span>
                {idx === 0 && <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">Today</span>}
              </div>
              <div className="text-sm font-bold text-white mb-1">
                {day.tempMax}° / <span className="text-xs text-slate-400">{day.tempMin}°</span>
              </div>
              <div className="text-xs text-emerald-300/90 font-medium mb-2">{day.condition}</div>
              <div className="text-[11px] text-slate-400 leading-snug border-t border-slate-800/60 pt-2">
                {day.actionAdvice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Localised Agro-Ecological AI Assistant */}
      <div className="bg-slate-900/90 rounded-2xl border border-emerald-900/40 shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-b border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">BRICS Localised Agro-Ecological AI Copilot</h3>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  <Sparkles className="w-2.5 h-2.5" /> Trained on BRICS Agro-Ecological Data
                </span>
              </div>
              <p className="text-xs text-slate-400">Contextualized for {nation.name} • {nation.primaryZone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeak}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Voice narration simulation"
            >
              {isSpeaking ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Voice Active' : 'Listen'}</span>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-5 max-h-96 overflow-y-auto space-y-4 bg-slate-950/40">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-2xl rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 prose prose-invert max-w-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>
                <div className={`text-[10px] mt-1.5 ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Synthesizing soil data, satellite NDVI, and regenerative agro-forestry research...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-900 flex flex-wrap gap-2 items-center">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Quick questions:
          </span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] bg-slate-900 hover:bg-emerald-950/60 hover:text-emerald-300 text-slate-300 px-3 py-1 rounded-full border border-slate-800 hover:border-emerald-700/50 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Ask anything about regenerative soil care, bio-inputs, or climate resilience in ${nation.name}...`}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={isThinking || !userInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950"
            >
              <Send className="w-4 h-4" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
