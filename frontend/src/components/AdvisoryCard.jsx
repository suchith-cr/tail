import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import VoiceNarrator from './VoiceNarrator';
import { ShieldAlert, Activity, CheckSquare, Sparkles, Calendar, Zap } from 'lucide-react';

export default function AdvisoryCard({ result, type = 'disease' }) {
  const [activeTab, setActiveTab] = useState('treatment');

  if (!result) return null;

  if (type === 'disease') {
    const speechText = `Crop Diagnostic Result: ${result.diseaseName}. Severity is ${result.severity} with ${result.confidenceScore}% confidence. Treatment Plan: ${result.treatmentPlan}. Preventative Measures: ${result.preventativeMeasures}.`;

    return (
      <div className="glass-panel rounded-2xl border border-emerald-500/20 p-6 shadow-2xl space-y-6">
        {/* Header Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                AI Vision Diagnostic
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(result.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mt-1 flex items-center gap-2">
              {result.diseaseName}
            </h3>
            {result.botanicalName && (
              <p className="text-xs italic text-slate-400">
                Pathogen: {result.botanicalName}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={result.severity} size="lg" />
            <VoiceNarrator text={speechText} label="Listen" />
          </div>
        </div>

        {/* Confidence Score Bar */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-medium mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> AI Diagnostic Confidence
            </span>
            <span className="text-emerald-400 font-bold text-sm">
              {result.confidenceScore}%
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, Math.max(10, result.confidenceScore))}%` }}
            />
          </div>
        </div>

        {/* Tabs for Detailed Action Plan */}
        <div>
          <div className="flex border-b border-slate-800 gap-2">
            <button
              onClick={() => setActiveTab('treatment')}
              className={`pb-2.5 text-xs font-semibold px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'treatment'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> Treatment Plan
            </button>
            <button
              onClick={() => setActiveTab('prevention')}
              className={`pb-2.5 text-xs font-semibold px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'prevention'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" /> Preventative Measures
            </button>
          </div>

          <div className="mt-4 text-sm leading-relaxed text-slate-300 bg-slate-900/40 rounded-xl p-4 border border-slate-800/50">
            {activeTab === 'treatment' ? (
              <div className="space-y-2">
                <p className="font-medium text-emerald-300 text-xs">Immediate Remediation Roadmap:</p>
                <p>{result.treatmentPlan}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-medium text-emerald-300 text-xs">Long-Term Agronomic Protection:</p>
                <p>{result.preventativeMeasures}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'weather') {
    const speechText = `Weather Advisory for ${result.location}. Alert Level is ${result.alertLevel}. Short Term Action: ${result.shortTermAction}. Long Term Advice: ${result.longTermAdvice}.`;

    return (
      <div className="glass-panel rounded-2xl border border-emerald-500/20 p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Climate & Microclimate Advisory
            </span>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">
              {result.location}
            </h3>
            <p className="text-xs text-slate-400">Season Context: {result.season || 'Current Cycle'}</p>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={result.alertLevel} type="weather" size="lg" />
            <VoiceNarrator text={speechText} label="Listen" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> 48-72h Immediate Action Plan
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{result.shortTermAction}</p>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Seasonal Adaptation Strategy
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{result.longTermAdvice}</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'market') {
    const speechText = `Market Intelligence for ${result.cropType}. Best time to sell: ${result.bestTimeToSell}. Price trend is ${result.estimatedPriceTrend}. Strategy: ${result.strategyRecommendation}.`;

    return (
      <div className="glass-panel rounded-2xl border border-emerald-500/20 p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Predictive Market Analytics
            </span>
            <h3 className="text-2xl font-bold text-slate-100 mt-1">
              {result.cropType} ({result.yield || 'N/A'} Tons Yield)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={result.estimatedPriceTrend} type="market" size="lg" />
            <VoiceNarrator text={speechText} label="Listen" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 rounded-xl p-5 border border-emerald-500/30">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Optimal Harvesting & Selling Window
          </span>
          <p className="text-xl font-extrabold text-white mt-1">
            {result.bestTimeToSell}
          </p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            AI Mandi Strategy & Pricing Roadmap
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {result.strategyRecommendation}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
