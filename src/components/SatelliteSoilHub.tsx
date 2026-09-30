import React, { useState } from 'react';
import { 
  Satellite, Layers, Sliders, RefreshCw, Download, 
  Sparkles, CheckCircle2, AlertOctagon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BricsNation, SoilMetrics, NdviZone } from '../types';

interface SatelliteSoilHubProps {
  nation: BricsNation;
  initialSoil: SoilMetrics;
  ndviZones: NdviZone[];
}

export const SatelliteSoilHub: React.FC<SatelliteSoilHubProps> = ({
  nation,
  initialSoil,
  ndviZones
}) => {
  const [selectedZone, setSelectedZone] = useState<NdviZone>(ndviZones[0]);
  const [soil, setSoil] = useState<SoilMetrics>(initialSoil);
  const [isSimulating, setIsSimulating] = useState(false);

  // Calculate Regenerative Soil Index (0-100)
  const calculateRegenScore = (metrics: SoilMetrics): number => {
    let score = 0;
    // Soil Organic Carbon (SOC) is paramount for regenerative agriculture
    if (metrics.organicCarbon >= 2.5) score += 35;
    else if (metrics.organicCarbon >= 1.5) score += 28;
    else if (metrics.organicCarbon >= 1.0) score += 20;
    else score += (metrics.organicCarbon / 1.0) * 15;

    // pH balance (ideal 6.5 - 7.5)
    const phDev = Math.abs(metrics.ph - 7.0);
    if (phDev <= 0.4) score += 20;
    else if (phDev <= 0.9) score += 15;
    else score += Math.max(5, 15 - phDev * 8);

    // Moisture (ideal 30-45%)
    if (metrics.moisture >= 30 && metrics.moisture <= 45) score += 15;
    else if (metrics.moisture > 45) score += 10;
    else score += (metrics.moisture / 30) * 12;

    // NPK balance
    const nScore = Math.min(10, (metrics.nitrogen / 250) * 10);
    const pScore = Math.min(10, (metrics.phosphorus / 30) * 10);
    const kScore = Math.min(10, (metrics.potassium / 280) * 10);
    score += (nScore + pScore + kScore);

    return Math.min(100, Math.round(score));
  };

  const regenScore = calculateRegenScore(soil);

  const getScoreStatus = (score: number) => {
    if (score >= 85) return { label: 'Regenerative Champion', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40' };
    if (score >= 70) return { label: 'Balanced & Restoring', color: 'text-teal-300', bg: 'bg-teal-500/20', border: 'border-teal-500/40' };
    if (score >= 50) return { label: 'Moderate Degradation', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/40' };
    return { label: 'Critically Depleted Soil', color: 'text-rose-400', bg: 'bg-rose-500/20', border: 'border-rose-500/40' };
  };

  const status = getScoreStatus(regenScore);

  const handleSimulateRegeneration = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSoil({
        nitrogen: 240,
        phosphorus: 28,
        potassium: 290,
        ph: 6.8,
        organicCarbon: 2.65,
        moisture: 38,
        electricalConductivity: 0.35,
        microbiomeActivity: 'Optimal'
      });
      setIsSimulating(false);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // fallback
      }
    }, 600);
  };

  const handleResetSoil = () => {
    setSoil(initialSoil);
  };

  const handleExportData = () => {
    const reportData = {
      country: nation.name,
      zone: nation.primaryZone,
      timestamp: new Date().toISOString(),
      soil_metrics: soil,
      regenerative_score: regenScore,
      selected_ndvi_quadrant: selectedZone
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgriN_Soil_NDVI_${nation.code}_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Satellite className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Satellite Earth Observation & Soil Health Hub</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              Sentinel-2B / Copernicus Feed
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time multispectral vegetation vigor, soil organic carbon (SOC) telemetry, and regenerative restoration simulations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export DPG GeoJSON</span>
          </button>
        </div>
      </div>

      {/* Grid: Satellite NDVI Visualizer & Interactive Field Quadrants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Satellite Field Map (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Multispectral NDVI Field Matrix</h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Resolution: 10m Pixel Grid
              </span>
            </div>

            {/* Interactive Field Visualizer */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {ndviZones.map((zone) => {
                const isSelected = selectedZone.zoneId === zone.zoneId;
                const isVigorous = zone.ndviValue >= 0.75;
                const isModerate = zone.ndviValue >= 0.55 && zone.ndviValue < 0.75;
                const isCritical = zone.ndviValue < 0.55;

                return (
                  <button
                    key={zone.zoneId}
                    onClick={() => setSelectedZone(zone)}
                    className={`relative p-4 rounded-xl text-left transition-all border overflow-hidden ${
                      isSelected
                        ? 'ring-2 ring-emerald-500 border-transparent shadow-lg'
                        : 'border-slate-800 hover:border-slate-700'
                    } ${
                      isVigorous
                        ? 'bg-gradient-to-br from-emerald-950/80 to-slate-900'
                        : isModerate
                        ? 'bg-gradient-to-br from-teal-950/80 to-slate-900'
                        : 'bg-gradient-to-br from-amber-950/60 to-rose-950/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-slate-300">{zone.zoneId}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isVigorous
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isModerate
                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {zone.vegetationHealth}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-200 mb-2 truncate">
                      {zone.name}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400">NDVI Index</div>
                        <div className="text-xl font-bold text-white font-mono">{zone.ndviValue}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Canopy Cover</div>
                        <div className="text-sm font-semibold text-emerald-400">{zone.canopyCoverPct}%</div>
                      </div>
                    </div>

                    {/* Visual health bar */}
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isVigorous ? 'bg-emerald-400' : isModerate ? 'bg-teal-400' : 'bg-rose-400'
                        }`}
                        style={{ width: `${zone.ndviValue * 100}%` }}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Zone Deep Dive */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">Active Quadrant Inspection: {selectedZone.name}</span>
                {selectedZone.waterDeficit ? (
                  <span className="flex items-center gap-1 text-rose-400 font-medium">
                    <AlertOctagon className="w-3.5 h-3.5" /> High Water Deficit Detected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Moisture Balance
                  </span>
                )}
              </div>
              <p className="text-slate-400 leading-relaxed mb-3">
                {selectedZone.ndviValue >= 0.7
                  ? `High photosynthetic canopy index indicates robust photosynthetic biomass. Recommended action: Maintain cover crop residue and prepare biochar-inoculant blend for post-harvest retention.`
                  : `Sub-optimal vegetative index detected in this sector. Soil compaction and organic carbon deficiency are restricting root expansion. Immediate action: Apply 8 tons/ha vermicompost and broadcast deep-rooting tillage radish.`}
              </p>
              
              <div className="flex items-center gap-4 text-[11px] text-slate-300 font-mono">
                <span>NDWI (Water): 0.42</span>
                <span>EVI (Enhanced): 0.61</span>
                <span>Albedo: 0.18</span>
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>NDVI Legend:</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-rose-500"></span> Bare / Depleted (&lt;0.4)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Stressed (0.4–0.6)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Regenerative Canopy (&gt;0.7)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Soil Health Card & Regeneration Simulator (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Interactive Soil Health Card</h3>
              </div>
              <button
                onClick={handleResetSoil}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                title="Reset to local baseline"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Regeneration Gauge Score Card */}
            <div className={`p-4 rounded-xl border mb-5 transition-all ${status.bg} ${status.border}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs text-slate-300 font-medium">Regenerative Soil Index</div>
                  <div className={`text-3xl font-black ${status.color} tracking-tight font-mono`}>
                    {regenScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.border} ${status.color}`}>
                    {status.label}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Microbiome: <strong className="text-slate-200">{soil.microbiomeActivity}</strong>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-teal-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${regenScore}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800/40 text-[11px]">
                <div>
                  <span className="text-slate-400">Water Retention:</span>
                  <div className="font-semibold text-slate-200">
                    {soil.organicCarbon > 1.8 ? '+45% high' : '+15% limited'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Carbon Sink:</span>
                  <div className="font-semibold text-slate-200">
                    {(soil.organicCarbon * 1150).toFixed(0)} kg/ha
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Erosion Buffer:</span>
                  <div className="font-semibold text-slate-200">
                    {soil.moisture > 30 ? 'Strong' : 'At Risk'}
                  </div>
                </div>
              </div>
            </div>

            {/* Sliders for Soil Parameters */}
            <div className="space-y-3.5 text-xs">
              {/* Organic Carbon (SOC) */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="font-medium flex items-center gap-1">
                    Soil Organic Carbon (SOC)
                    <span className="text-[10px] text-emerald-400">(Vital for regeneration)</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{soil.organicCarbon.toFixed(2)} %</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4.5"
                  step="0.05"
                  value={soil.organicCarbon}
                  onChange={(e) => setSoil({ ...soil, organicCarbon: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Soil pH */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="font-medium">Soil Reaction (pH)</span>
                  <span className="font-mono font-bold text-white">{soil.ph.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="4.5"
                  max="9.0"
                  step="0.1"
                  value={soil.ph}
                  onChange={(e) => setSoil({ ...soil, ph: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Available Nitrogen */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="font-medium">Available Nitrogen (N)</span>
                  <span className="font-mono font-bold text-white">{soil.nitrogen} kg/ha</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="350"
                  step="5"
                  value={soil.nitrogen}
                  onChange={(e) => setSoil({ ...soil, nitrogen: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Phosphorus & Potassium row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="font-medium">Phosphorus (P)</span>
                    <span className="font-mono font-bold text-white">{soil.phosphorus}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={soil.phosphorus}
                    onChange={(e) => setSoil({ ...soil, phosphorus: parseInt(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="font-medium">Potassium (K)</span>
                    <span className="font-mono font-bold text-white">{soil.potassium}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="450"
                    step="5"
                    value={soil.potassium}
                    onChange={(e) => setSoil({ ...soil, potassium: parseInt(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>

              {/* Soil Moisture */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span className="font-medium">Soil Moisture</span>
                  <span className="font-mono font-bold text-cyan-300">{soil.moisture} %</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={soil.moisture}
                  onChange={(e) => setSoil({ ...soil, moisture: parseInt(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Quick Action: Simulate 2-Season Regenerative Restoration */}
          <div className="mt-5 pt-3 border-t border-slate-800">
            <button
              onClick={handleSimulateRegeneration}
              disabled={isSimulating}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSimulating ? 'Simulating Bio-Restoration...' : 'Simulate 2-Year Regenerative Transition'}</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              Applies legume cover cropping, Jeevamrutha inoculation, and biochar matrix.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
