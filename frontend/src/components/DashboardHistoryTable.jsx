import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import { Activity, CloudSun, TrendingUp, Calendar, ChevronRight, FileText } from 'lucide-react';

export default function DashboardHistoryTable({ history = { diagnostics: [], weather: [], market: [] } }) {
  const [activeTab, setActiveTab] = useState('diagnostics');

  const { diagnostics = [], weather = [], market = [] } = history;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Table Category Filter Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 p-2 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'diagnostics'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Crop Diagnostics ({diagnostics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'weather'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>Weather Alerts ({weather.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('market')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'market'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-teal-400" />
          <span>Market Intelligence ({market.length})</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {activeTab === 'diagnostics' && (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Disease / Specimen</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">Treatment Summary</th>
                <th className="py-3.5 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {diagnostics.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No crop disease assessments recorded yet.
                  </td>
                </tr>
              ) : (
                diagnostics.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      <div>{item.disease_name}</div>
                      {item.botanical_name && (
                        <div className="text-[10px] text-slate-400 italic">{item.botanical_name}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      {item.confidence_score}%
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.severity} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-400">
                      {item.treatment_plan}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'weather' && (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Season</th>
                <th className="py-3.5 px-4">Alert Level</th>
                <th className="py-3.5 px-4">Action Summary</th>
                <th className="py-3.5 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {weather.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No weather advisories recorded yet.
                  </td>
                </tr>
              ) : (
                weather.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      {item.location}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {item.season || 'General'}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.alert_level} type="weather" size="sm" />
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-400">
                      {item.short_term_action}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'market' && (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Crop Type</th>
                <th className="py-3.5 px-4">Yield (Tons)</th>
                <th className="py-3.5 px-4">Best Sell Time</th>
                <th className="py-3.5 px-4">Price Trend</th>
                <th className="py-3.5 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {market.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No market timing analyses recorded yet.
                  </td>
                </tr>
              ) : (
                market.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      {item.crop_type}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-emerald-300">
                      {item.estimated_yield}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {item.best_time_to_sell}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.estimated_price_trend} type="market" size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
