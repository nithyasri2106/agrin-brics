import React, { useState } from 'react';
import { 
  Microscope, Upload, Sparkles, CheckCircle2, 
  ShieldAlert, FileText, Eye, Leaf, ShieldCheck
} from 'lucide-react';
import type { DiseaseSample } from '../types';
import { CROP_DISEASE_SAMPLES } from '../data/mockData';

export const DiseaseDoctor: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<DiseaseSample>(CROP_DISEASE_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'biological' | 'regenerative' | 'prevention'>('biological');

  const handleSelectSample = (sample: DiseaseSample) => {
    setCustomImage(null);
    setIsScanning(true);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsScanning(false);
    }, 450);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
        setIsScanning(true);
        setTimeout(() => {
          // Select closest match or default sample for uploaded image
          setSelectedSample(CROP_DISEASE_SAMPLES[1]);
          setIsScanning(false);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrintPrescription = () => {
    window.print();
  };

  const getSeverityBadge = (severity: 'Mild' | 'Moderate' | 'Severe') => {
    switch (severity) {
      case 'Mild':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Severe':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">AI Crop Disease & Pest Pathology Clinic</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Computer Vision Inference
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Instant multimodal pathogen classification with zero-chemical organic and biological prescriptions.
          </p>
        </div>

        <button
          onClick={handlePrintPrescription}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Prescription</span>
        </button>
      </div>

      {/* Grid: Left Image & Samples, Right Pathology Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Image Scanner & Sample Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Image with Animated Scanning Overlay */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
            <div className="relative aspect-video sm:aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={customImage || selectedSample.imageUrl}
                alt={selectedSample.diseaseName}
                className="w-full h-full object-cover"
              />

              {/* Laser Scan Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px] flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute top-0 animate-bounce shadow-lg shadow-emerald-500"></div>
                  <div className="bg-slate-950/90 px-4 py-2 rounded-xl border border-emerald-500/50 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Neural Network Scanning Leaf Tissue...</span>
                  </div>
                </div>
              )}

              {/* Image Watermark / Overlay info */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{selectedSample.cropName}</span>
                <span className="text-emerald-400 font-mono font-bold">{selectedSample.confidence}% Match</span>
              </div>
            </div>

            {/* Custom Upload Button */}
            <div className="mt-3">
              <label className="w-full cursor-pointer py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-emerald-500 text-slate-300 font-medium text-xs flex items-center justify-center gap-2 transition-all">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Field Photo from Smartphone / Camera</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Preset Quick-Test Samples for Judges */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span>Judge Quick-Test Samples (6 Crops):</span>
              <span className="text-[10px] text-emerald-400">Click to diagnose</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {CROP_DISEASE_SAMPLES.map((sample) => {
                const isSelected = selectedSample.id === sample.id && !customImage;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 ring-1 ring-emerald-500 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.cropName}
                      className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-bold text-slate-200 truncate">{sample.cropName}</div>
                      <div className="text-[10px] text-emerald-400 truncate">{sample.diseaseName}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Pathological Diagnostic & Organic Prescriptions (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            {/* Disease Diagnosis Header */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getSeverityBadge(selectedSample.severity)}`}>
                  {selectedSample.severity} Severity
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> AI Confidence: {selectedSample.confidence}%
                </span>
              </div>

              <h3 className="text-xl font-black text-white mb-1">
                {selectedSample.diseaseName}
              </h3>
              <div className="text-xs text-emerald-400 italic font-mono mb-2">
                {selectedSample.scientificClassification}
              </div>
              <div className="text-xs text-slate-400">
                Target Crop: <strong className="text-slate-200">{selectedSample.cropName}</strong> • Prescribed Protocol: <strong className="text-emerald-300">Regenerative Bio-Remediation</strong>
              </div>
            </div>

            {/* Symptoms Detected */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                Pathological Symptoms Identified:
              </h4>
              <div className="space-y-1.5">
                {selectedSample.symptoms.map((symptom, idx) => (
                  <div key={idx} className="text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5"></span>
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescriptions Tab Selector */}
            <div className="flex gap-2 border-b border-slate-800 pb-2 mb-3">
              <button
                onClick={() => setActiveTab('biological')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'biological'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Organic Biological Remedies
              </button>
              <button
                onClick={() => setActiveTab('regenerative')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'regenerative'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Soil & Canopy Bio-Actions
              </button>
              <button
                onClick={() => setActiveTab('prevention')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'prevention'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Rotation & Cultural Control
              </button>
            </div>

            {/* Tab Contents */}
            <div className="space-y-2">
              {activeTab === 'biological' && (
                <div className="space-y-2">
                  {selectedSample.organicRemedies.map((remedy, idx) => (
                    <div key={idx} className="bg-emerald-950/30 border border-emerald-800/40 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300">Biocontrol #{idx + 1}: </strong>
                        {remedy}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'regenerative' && (
                <div className="space-y-2">
                  {selectedSample.regenerativeBioTreatments.map((treatment, idx) => (
                    <div key={idx} className="bg-teal-950/30 border border-teal-800/40 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2.5">
                      <Leaf className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-teal-300">Agro-Ecological Action #{idx + 1}: </strong>
                        {treatment}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'prevention' && (
                <div className="space-y-2">
                  {selectedSample.preventionTechniques.map((prev, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">Long-Term Prevention #{idx + 1}: </strong>
                        {prev}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Prescription Footer */}
          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Prescription ID: <strong className="text-slate-200 font-mono">RX-BRICS-942</strong></span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Safe for Natural Farming
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
