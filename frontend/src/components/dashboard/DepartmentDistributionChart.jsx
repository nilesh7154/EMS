import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const COLORS = [
  '#4f46e5', // indigo-600
  '#06b6d4', // cyan-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#3b82f6', // blue-500
  '#64748b'  // slate-500
];

export default function DepartmentDistributionChart({ data = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-44 mb-6" />
        <div className="h-64 bg-slate-100 rounded-xl" />
      </div>
    );
  }

  const hasData = Array.isArray(data) && data.length > 0 && data.some(d => d.employeeCount > 0);

  const formattedData = data
    .filter(d => d.employeeCount > 0)
    .map(d => ({
      name: d.departmentName,
      value: d.employeeCount,
      percentage: d.percentage
    }));

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Department Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Headcount breakdown across departments
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <PieChartIcon className="w-4 h-4" />
        </div>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[260px] text-center p-4 border border-dashed border-slate-200 rounded-xl">
          <PieChartIcon className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-xs font-semibold text-slate-600">No department data available</p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
            Add employees and assign them to departments to view the distribution.
          </p>
        </div>
      ) : (
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {formattedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white text-xs py-2 px-3 rounded-lg shadow-lg">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-slate-300 mt-0.5">
                          {item.value} employee{item.value !== 1 ? 's' : ''} ({item.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs font-medium text-slate-600 mr-2">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
