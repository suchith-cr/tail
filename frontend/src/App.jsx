import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import DiseaseScanner from './pages/DiseaseScanner';
import WeatherAlerts from './pages/WeatherAlerts';
import MarketInsights from './pages/MarketInsights';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
        {/* Top Sticky Header */}
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 flex overflow-hidden">
          {/* Collapsible/Responsive Left Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main App Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/disease-scanner" element={<DiseaseScanner />} />
              <Route path="/weather-alerts" element={<WeatherAlerts />} />
              <Route path="/market-insights" element={<MarketInsights />} />
              {/* Fallback route */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
