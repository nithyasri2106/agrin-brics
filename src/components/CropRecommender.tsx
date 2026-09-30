import React, { useState } from 'react';
import { 
  Sprout, Award, DollarSign, BookOpen, CheckCircle2 
} from 'lucide-react';
import type { BricsNation, RegenerativeCropPlan } from '../types';
import { REGENERATIVE_CROP_PLANS } from '../data/mockData';

interface CropRecommenderProps {
  nation: BricsNation;
}

export const CropRecommender: React.FC<CropRecommenderProps> = ({ nation }) => {
  const plans = REGENERATIVE_CROP_PLANS[nation.code] || REGENERATIVE_CROP_PLANS.IN;
  const [selectedPlan, setSelectedPlan] = useState<RegenerativeCropPlan>(plans[0]);
  const [farmHectares, setFarmHectares] = useState<number>(2.5);
  const [carbonPricePerTon, setCarbonPricePerTon] = useState<number>(28); // $28 / ton CO2e

  const annualCarbonOffsetKg = selectedPlan.carbonOffsetKgPerHa * farmHectares;
  const annualCarbonTons = (annualCarbonOffsetKg / 1000).toFixed(1);
  const annualCarbonRevenue = (parseFloat(annualCarbonTons) * carbonPricePerTon).toFixed(0);
  const waterSavedLiters = (farmHectares * selectedPlan.waterSavingPct * 85000).toLocaleString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Regenerative Agro-Ecological Crop Recommender</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30">
              Multi-Tier Polyculture
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Tailored companion cropping systems that maximize soil carbon sequestration, biological nitrogen fixation, and smallholder net income.
          </p>
        </div>

        {/* Plan Selector if multiple */}
        {plans.length > 1 && (
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 px-2 font-medium">Model:</span>
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlan(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPlan.id === p.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.primaryCrop.split('(')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main 3-Tier Cropping Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1: Primary Cash Crop */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-emerald-800/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Tier 1 • Main Canopy
              </span>
              <span className="text-xs text-slate-400">{selectedPlan.growingCycleDays} Days Cycle</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{selectedPlan.primaryCrop}</h3>
            <p className="text-xs italic text-slate-400 mb-3">{selectedPlan.scientificName}</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Drives seasonal cash flow while offering high climate resilience against heat spikes and intermittent precipitation.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Expected Yield:</span>
            <span className="font-bold text-emerald-400">{selectedPlan.expectedYieldTonsHa} t/ha</span>
          </div>
        </div>

        {/* Tier 2: Companion Legume */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-teal-800/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                Tier 2 • Nitrogen Fixer
              </span>
              <span className="text-xs text-teal-400 font-medium">Rhizobium Symbiosis</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{selectedPlan.companionCrop}</h3>
            <p className="text-xs text-slate-400 mb-3">Intercropped in alternate rows / border bands</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Fixes 45–65 kg of atmospheric nitrogen per hectare directly into the rhizosphere, eliminating synthetic urea reliance.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Synthetic Urea Saved:</span>
            <span className="font-bold text-teal-300">-60% to -80%</span>
          </div>
        </div>

        {/* Tier 3: Biomass Cover Crop */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-cyan-800/40 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Tier 3 • Living Armor
              </span>
              <span className="text-xs text-cyan-400 font-medium">Erosion Barrier</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{selectedPlan.coverCrop}</h3>
            <p className="text-xs text-slate-400 mb-3">Understory living mulch or off-season cover</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Builds deep taproot biopores, intercepts rain impact, retains moisture, and suppresses troublesome weeds naturally.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Water Conservation:</span>
            <span className="font-bold text-cyan-300">+{selectedPlan.waterSavingPct}% Efficiency</span>
          </div>
        </div>
      </div>

      {/* Soil Benefits List */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          Scientifically Verified Agro-Ecological Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {selectedPlan.soilBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 leading-relaxed">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Carbon Credits & Economic ROI Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Carbon Revenue Calculator (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-emerald-950/40 rounded-2xl p-5 border border-emerald-900/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Smallholder Carbon Credit & Net ROI Model</h3>
              </div>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-medium">
                BRICS Voluntary Carbon Standard
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Farm Size Slider */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Farm Holding Size:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{farmHectares} ha</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.5"
                  value={farmHectares}
                  onChange={(e) => setFarmHectares(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.5 ha (Smallholder)</span>
                  <span>15 ha</span>
                </div>
              </div>

              {/* Carbon Credit Price Slider */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Carbon Offset Price:</span>
                  <span className="font-mono font-bold text-cyan-300 text-sm">${carbonPricePerTon} / ton CO₂e</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="50"
                  step="1"
                  value={carbonPricePerTon}
                  onChange={(e) => setCarbonPricePerTon(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$15/ton (Base)</span>
                  <span>$50/ton (Premium Agro)</span>
                </div>
              </div>
            </div>

            {/* Simulated Returns Display */}
            <div className="grid grid-cols-3 gap-3 bg-slate-950/90 p-4 rounded-xl border border-emerald-900/50">
              <div>
                <div className="text-[10px] text-slate-400">Total Carbon Sequestered</div>
                <div className="text-xl font-black text-white font-mono">{annualCarbonTons} <span className="text-xs font-normal text-slate-400">t CO₂e/yr</span></div>
                <div className="text-[10px] text-emerald-400 font-medium">In top 30cm soil</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400">Estimated Carbon Payout</div>
                <div className="text-xl font-black text-emerald-400 font-mono">${annualCarbonRevenue} <span className="text-xs font-normal text-slate-400">USD/yr</span></div>
                <div className="text-[10px] text-slate-400">Direct to farmer wallet</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400">Water Conserved</div>
                <div className="text-xl font-black text-cyan-300 font-mono">{waterSavedLiters}</div>
                <div className="text-[10px] text-slate-400">Liters preserved</div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-3">
            * Verified under the open BRICS AgriN Soil Carbon MRV (Monitoring, Reporting, and Verification) protocol.
          </p>
        </div>

        {/* Right: On-Demand Bio-Input Pharmacopeia (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">Recommended Natural Bio-Inputs</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Zero-budget formulations that replace synthetic agro-chemicals with farm-sourced microbial ferments:
            </p>

            <div className="space-y-3">
              {selectedPlan.bioInputs.map((input, idx) => (
                <div key={idx} className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-300">{input.name}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {input.applicationStage}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    <strong>Recipe:</strong> {input.recipe}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>All recipes open-source under BRICS AgriN</span>
            <span className="text-emerald-400 font-medium">100% Organic & Non-Toxic</span>
          </div>
        </div>
      </div>
    </div>
  );
};
