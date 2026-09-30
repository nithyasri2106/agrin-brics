import React, { useState } from 'react';
import { 
  Network, Radio, Code, Copy, Check, 
  Download, ShieldCheck, Cpu, Database, Sparkles, CheckCircle2 
} from 'lucide-react';
import { TRANSBOUNDARY_ALERTS, OPEN_AGRI_ENDPOINTS } from '../data/mockData';
import type { TransboundaryAlert, OpenAgriEndpoint } from '../types';

export const BricsInteroperability: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<TransboundaryAlert>(TRANSBOUNDARY_ALERTS[0]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<OpenAgriEndpoint>(OPEN_AGRI_ENDPOINTS[0]);
  const [hasCopied, setHasCopied] = useState(false);
  const [isExecutingApi, setIsExecutingApi] = useState(false);
  const [apiExecutionStatus, setApiExecutionStatus] = useState<string | null>(null);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedEndpoint.sampleResponse, null, 2));
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleTestApi = () => {
    setIsExecutingApi(true);
    setApiExecutionStatus(null);
    setTimeout(() => {
      setIsExecutingApi(false);
      setApiExecutionStatus('HTTP 200 OK — 42ms (Node: BRICS-Mesh-Gateway)');
    }, 400);
  };

  const handleDownloadOpenApi = () => {
    const spec = {
      openapi: '3.0.3',
      info: {
        title: 'BRICS AgriN Interoperable Open-Agri API',
        version: '1.4.0',
        description: 'Digital Public Good open specification for cross-border regenerative agro-intelligence and satellite telemetry.'
      },
      servers: [{ url: 'https://mesh.agrin-brics.org/v1' }],
      endpoints: OPEN_AGRI_ENDPOINTS
    };
    const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BRICS_AgriN_OpenAPI_v1.4.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">BRICS Digital Public Good & Interoperability Hub</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30">
              Cooperative Data Mesh
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Open-source digital public good enabling BRICS member states (ICAR, EMBRAPA, ARC, CAAS, RAS) to share AI models, seed registries, and transboundary pest surveillance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadOpenApi}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white shadow-md shadow-emerald-950 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download OpenAPI Spec</span>
          </button>
        </div>
      </div>

      {/* Cross-Border Transboundary Threat Surveillance Radar */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h3 className="text-sm font-semibold text-white">
              Transboundary Climate & Pest Surveillance Network
            </h3>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            3 Active Multilateral Watch Protocols
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Alert Pills */}
          <div className="lg:col-span-4 space-y-2">
            {TRANSBOUNDARY_ALERTS.map((alert) => {
              const isSelected = selectedAlert.id === alert.id;
              return (
                <button
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{alert.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alert.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : alert.severity === 'High Alert'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mb-1 leading-snug">
                    {alert.title}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    Origin: {alert.originCountry}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Alert Deep Dive Detail */}
          <div className="lg:col-span-8 bg-slate-950/70 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-emerald-400">{selectedAlert.id} • {selectedAlert.reportedDate}</span>
                <span className="text-xs text-slate-400 font-medium">Type: <strong className="text-slate-200">{selectedAlert.type}</strong></span>
              </div>

              <h4 className="text-base font-bold text-white mb-2">{selectedAlert.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {selectedAlert.description}
              </p>

              {/* Affected Corridor */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Affected Member Corridors:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAlert.affectedRegions.map((region, idx) => (
                    <span key={idx} className="text-xs bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                      🌍 {region}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cooperative Actions */}
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1.5">
                  Joint BRICS Multilateral Actions in Progress:
                </span>
                <div className="space-y-1.5">
                  {selectedAlert.cooperativeActions.map((action, idx) => (
                    <div key={idx} className="text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Coordinated via BRICS Agricultural Research Platform (BARP)</span>
              <span className="text-emerald-400 font-mono font-medium">Telemetry Status: Active Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Open-Agri REST API Schema Console */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Open-Agri Standardized API Console (DPG Interoperability)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestApi}
              disabled={isExecutingApi}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isExecutingApi ? 'Calling Mesh...' : 'Send Live Request'}</span>
            </button>
            <button
              onClick={handleCopyJson}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{hasCopied ? 'Copied!' : 'Copy Response'}</span>
            </button>
          </div>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {OPEN_AGRI_ENDPOINTS.map((endpoint, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedEndpoint(endpoint);
                setApiExecutionStatus(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedEndpoint.endpoint === endpoint.endpoint
                  ? 'bg-slate-800 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {endpoint.method}
              </span>
              <span>{endpoint.endpoint}</span>
            </button>
          ))}
        </div>

        {/* Endpoint Description */}
        <p className="text-xs text-slate-400 mb-3">
          {selectedEndpoint.description}
        </p>

        {apiExecutionStatus && (
          <div className="mb-3 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{apiExecutionStatus}</span>
          </div>
        )}

        {/* JSON Code Viewer */}
        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-xs font-mono overflow-x-auto max-h-72">
          <pre className="text-emerald-300 leading-relaxed">
            {JSON.stringify(selectedEndpoint.sampleResponse, null, 2)}
          </pre>
        </div>
      </div>

      {/* Federated AI & Seed Sharing Registry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-white font-semibold text-xs mb-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Federated Soil Carbon Model v3.2</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Trained collaboratively across 18,000 soil test sites in India, Brazil, and South Africa without centralizing sensitive land records.
          </p>
          <div className="text-[10px] text-emerald-400 font-mono">Accuracy: 94.2% • Privacy-Preserving</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-white font-semibold text-xs mb-2">
            <Database className="w-4 h-4 text-teal-400" />
            <span>Climate Resilient Germplasm Pool</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Open multilateral registry containing 420 drought-hardy millet, sorghum, and legume cultivars available for non-commercial seed breeding.
          </p>
          <div className="text-[10px] text-teal-300 font-mono">420 Landraces Indexed • Open Access</div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 text-white font-semibold text-xs mb-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>DPG Standard v1.4 Compliance</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Fully open source (MIT license), adheres to FAO AGROVOC taxonomy, GeoJSON coordinate standards, and UNESCO Open Science principles.
          </p>
          <div className="text-[10px] text-cyan-300 font-mono">100% Digital Public Good Compliant</div>
        </div>
      </div>
    </div>
  );
};
