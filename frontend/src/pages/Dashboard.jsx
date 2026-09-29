import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardHistory } from '../services/api';
import DashboardHistoryTable from '../components/DashboardHistoryTable';
import { ScanLine, CloudSun, TrendingUp, ShieldAlert, Sparkles, RefreshCw, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [history, setHistory] = useState({ diagnostics: [], weather: [], market: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboardHistory();
      if (res.data) {
        setHistory(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch remote dashboard data:', err);
      setError('Running on local cached activity data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const totalAssessments = (history.diagnostics?.length || 0) + (history.weather?.length || 0) + (history.market?.length || 0);

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-emerald-500/30 p-6 sm:p-8 bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-teal-950/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI-Powered Agronomy Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-emerald-400">Rajesh</span> 🌾
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your unified central hub for real-time crop disease diagnosis, climate advisories, and predictive market timing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchHistory}
              disabled={loading}
              className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2 text-xs font-medium"
              title="Refresh Dashboard History"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Assessments</p>
              <h3 className="text-3xl font-extrabold text-white mt-1">{loading ? '...' : totalAssessments}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Recorded in Supabase DB
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Crop Scans</p>
              <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">{loading ? '...' : history.diagnostics?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <ScanLine className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Multimodal Vision Diagnoses</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weather Alerts</p>
              <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{loading ? '...' : history.weather?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <CloudSun className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Microclimate Action Plans</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 glass-card-hover">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Market Reports</p>
              <h3 className="text-3xl font-extrabold text-teal-300 mt-1">{loading ? '...' : history.market?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Optimal Selling Windows</p>
        </div>
      </div>

      {/* Primary Feature Launchpads */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Quick Advisory Launchpads</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Disease Scanner */}
          <Link
            to="/disease-scanner"
            className="group glass-panel rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-2xl hover:shadow-emerald-950/50"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Disease Scanner
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upload crop leaf photos for instant multimodal AI pathogen identification and treatment plans.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Scan Leaf Image</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 2: Weather Alerts */}
          <Link
            to="/weather-alerts"
            className="group glass-panel rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-2xl hover:shadow-amber-950/50"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Weather Risk Alerts
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get proactive microclimate warnings and 72-hour irrigation & spray timing recommendations.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Check Weather Risks</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 3: Market Insights */}
          <Link
            to="/market-insights"
            className="group glass-panel rounded-2xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-2xl hover:shadow-teal-950/50"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                Market Insights
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Analyze price trends for your yield volume to discover peak post-harvest selling windows.
              </p>
            </div>

            <div className="flex items-center text-xs font-bold text-teal-400 gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Analyze Mandi Prices</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* Historical Advisory Table */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Recent Assessment History</h2>
            <p className="text-xs text-slate-400">Past AI diagnostic reports saved in PostgreSQL DB</p>
          </div>
        </div>

        {loading ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
            <p className="text-sm font-medium">Fetching advisory log from Supabase database...</p>
          </div>
        ) : (
          <DashboardHistoryTable history={history} />
        )}
      </div>
    </div>
  );
}
