import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, CloudSun, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: 'Main'
    },
    {
      to: '/disease-scanner',
      label: 'Crop Disease Scanner',
      icon: ScanLine,
      badge: 'Vision AI'
    },
    {
      to: '/weather-alerts',
      label: 'Weather Risk Alerts',
      icon: CloudSun,
      badge: 'Live'
    },
    {
      to: '/market-insights',
      label: 'Market Strategy Tracker',
      icon: TrendingUp,
      badge: 'Trends'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 glass-panel border-r border-slate-800 bg-slate-950/95 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-0`}
      >
        <div className="space-y-6">
          {/* Logo Heading inside Mobile Sidebar */}
          <div className="flex items-center justify-between lg:hidden pb-4 border-b border-slate-800">
            <span className="font-bold text-emerald-400">AgriSmart AI</span>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Primary Modules
            </p>

            <nav className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/10 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Agri System Info Box */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900/80 border border-emerald-500/20 p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" /> Agronomist System
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Multimodal Gemini 2.5 Vision engine & Postgre SQL schema synchronization active.
          </p>
        </div>
      </aside>
    </>
  );
}
