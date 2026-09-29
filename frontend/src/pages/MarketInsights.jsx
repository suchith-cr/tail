import React, { useState } from 'react';
import AdvisoryCard from '../components/AdvisoryCard';
import { getMarketInsights } from '../services/api';
import { TrendingUp, Scale, Sparkles, Loader2, AlertCircle, DollarSign, Store, BarChart3 } from 'lucide-react';

const CROP_OPTIONS = ['Wheat', 'Rice (Paddy)', 'Corn (Maize)', 'Soybeans', 'Cotton', 'Tomatoes', 'Potatoes', 'Sugarcane'];

export default function MarketInsights() {
  const [cropType, setCropType] = useState('Wheat');
  const [yieldVal, setYieldVal] = useState('25');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedYield = parseFloat(yieldVal);
    if (isNaN(parsedYield) || parsedYield <= 0) {
      setError('Please enter a valid positive yield amount in metric tons.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await getMarketInsights({
        cropType: cropType,
        yield: parsedYield,
        userId: '00000000-0000-0000-0000-000000000001'
      });

      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError(res.error || 'Failed to generate market timing analysis.');
      }
    } catch (err) {
      console.error('Market insights request failed:', err);
      setError(err.error || err.details?.[0] || 'An unexpected error occurred during market trend calculation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-semibold text-teal-300">
          <TrendingUp className="w-3.5 h-3.5 text-teal-400" /> Market Price Intelligence & Timing
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Crop Selling Window & Price Analytics
        </h1>
        <p className="text-sm text-slate-300">
          Select your crop and harvest volume to generate AI-driven wholesale price predictions and post-harvest holding strategies to maximize income.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
            <div>
              <label htmlFor="crop-type-select" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-teal-400" /> Select Crop Commodity
              </label>
              <select
                id="crop-type-select"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              >
                {CROP_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="yield-input" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-teal-400" /> Estimated Yield (Metric Tons)
              </label>
              <input
                id="yield-input"
                type="number"
                step="0.5"
                min="0.1"
                value={yieldVal}
                onChange={(e) => setYieldVal(e.target.value)}
                placeholder="e.g. 25"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                required
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                loading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white shadow-teal-950/50 active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-teal-300" />
                  <span>Evaluating Global Mandi Prices...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-teal-200" />
                  <span>Analyze Market Selling Strategy</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Metrics */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-teal-400" /> Key Economic Indicators
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Wholesale Buffer Stock</span>
                <span className="text-slate-200 font-semibold">Monitored</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Export Freight Demand</span>
                <span className="text-emerald-400 font-semibold">+14.2%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Storage Loss Protection</span>
                <span className="text-teal-300 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="glass-panel rounded-2xl p-8 border border-teal-500/30 text-center space-y-6 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Analyzing Mandi Futures & Yield Volumes</h3>
                <p className="text-xs text-slate-400">Determining optimal post-harvest storage and price trend windows...</p>
              </div>
            </div>
          ) : result ? (
            <AdvisoryCard result={result} type="market" />
          ) : (
            <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center text-slate-400 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-200">Awaiting Yield Parameters</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Select your crop and harvest volume to generate AI-driven price trend predictions and holding strategies.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
