import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  colorScheme = 'indigo',
  isLoading = false
}) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.indigo;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center shrink-0`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <div className="h-8 bg-slate-200 rounded w-16 animate-pulse mb-1" />
        ) : (
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value ?? 0}
          </div>
        )}
        {subtext && (
          <span className="text-xs text-slate-500 mt-1 font-medium">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
