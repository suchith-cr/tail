import React, { useState } from 'react';
import AdvisoryCard from '../components/AdvisoryCard';
import { getWeatherAdvisory } from '../services/api';
import { CloudSun, MapPin, Calendar, Sparkles, Loader2, AlertCircle, Wind, Droplets, Thermometer } from 'lucide-react';

const SEASONS = ['Monsoon / Rainy', 'Kharif (Autumn)', 'Rabi (Spring)', 'Zaid (Summer)', 'Winter'];

export default function WeatherAlerts() {
  const [location, setLocation] = useState('Ludhiana, Punjab');
  const [season, setSeason] = useState('Monsoon / Rainy');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please enter your farm location (City/District/Region).');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await getWeatherAdvisory({
        location: location.trim(),
        season: season,
        userId: '00000000-0000-0000-0000-000000000001'
      });

      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError(res.error || 'Failed to generate climate advisory.');
      }
    } catch (err) {
      console.error('Weather advisory request failed:', err);
      setError(err.error || err.details?.[0] || 'An unexpected error occurred during weather advisory retrieval.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
          <CloudSun className="w-3.5 h-3.5 text-amber-400" /> Proactive Climate Advisories
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Location-Based Weather Alerts
        </h1>
        <p className="text-sm text-slate-300">
          Enter your location and cropping season to receive AI-synthesized microclimate alerts, field spray windows, and irrigation schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
            <div>
              <label htmlFor="location-input" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Farm Location (City / Region)
              </label>
              <input
                id="location-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ludhiana, Punjab or Nairobi, Kenya"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="season-select" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Current Season / Cycle
              </label>
              <select
                id="season-select"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              >
                {SEASONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
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
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-amber-950/50 active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                  <span>Synthesizing Climate Advisory...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>Generate AI Weather Advisory</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Weather Metrics Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Climate Factors Monitored</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <Droplets className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400">Precipitation</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <Wind className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400">Wind Drift</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <Thermometer className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400">Heat Stress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="glass-panel rounded-2xl p-8 border border-amber-500/30 text-center space-y-6 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Evaluating Regional Forecast Data</h3>
                <p className="text-xs text-slate-400">Synthesizing precipitation alerts and field management guidelines...</p>
              </div>
            </div>
          ) : result ? (
            <AdvisoryCard result={result} type="weather" />
          ) : (
            <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center text-slate-400 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <CloudSun className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-200">Awaiting Location Query</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Submit your region and cropping season to receive AI-synthesized microclimate alerts and protection plans.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
