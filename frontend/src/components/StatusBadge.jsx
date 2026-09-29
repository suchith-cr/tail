import React from 'react';
import { AlertTriangle, AlertOctagon, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

export default function StatusBadge({ status, type = 'severity', size = 'md' }) {
  const normStatus = (status || '').toUpperCase();

  let colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let IconComponent = CheckCircle2;

  if (['CRITICAL', 'HIGH', 'WARNING'].includes(normStatus)) {
    colorClasses = 'bg-rose-500/15 text-rose-400 border-rose-500/40 shadow-rose-950/40 shadow-sm animate-pulse-subtle';
    IconComponent = normStatus === 'CRITICAL' ? AlertOctagon : ShieldAlert;
  } else if (['MEDIUM', 'WATCH', 'MODERATE'].includes(normStatus)) {
    colorClasses = 'bg-amber-500/15 text-amber-400 border-amber-500/35 shadow-amber-950/30';
    IconComponent = AlertTriangle;
  } else if (['NORMAL', 'LOW', 'HEALTHY', 'STABLE', 'OPTIMAL'].includes(normStatus)) {
    colorClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-emerald-950/30';
    IconComponent = CheckCircle2;
  } else if (['RISING'].includes(normStatus)) {
    colorClasses = 'bg-teal-500/15 text-teal-300 border-teal-500/40';
    IconComponent = Info;
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs gap-1' 
    : size === 'lg' 
    ? 'px-3.5 py-1.5 text-sm gap-2 font-semibold' 
    : 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses} backdrop-blur-md transition-all duration-200`}>
      <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{normStatus || 'NORMAL'}</span>
    </span>
  );
}
