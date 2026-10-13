import React from 'react';
import { Database, Server, Shield, Layers, Code, CheckCircle2, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          System & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Architecture overview, backend configurations, and PostgreSQL database telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend Architecture Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Backend Architecture</h2>
              <p className="text-xs text-slate-500">Spring Boot 3.3.4 / Java 21 / Maven</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Service Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Online (Port 8085)
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Architecture Layer</span>
              <span className="font-mono text-slate-800">Controller → Service → Repository</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Dependency Injection</span>
              <span className="text-slate-800 font-medium">Constructor-based</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Error Handling</span>
              <span className="text-slate-800 font-medium">Centralized RestControllerAdvice</span>
            </div>
          </div>
        </div>

        {/* Database Configuration Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">PostgreSQL Persistence</h2>
              <p className="text-xs text-slate-500">Relational Database & Hibernate ORM</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Database Name</span>
              <span className="font-mono font-semibold text-slate-800">employee_management</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Host & Port</span>
              <span className="font-mono text-slate-800">localhost:5432</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Schema Strategy</span>
              <span className="text-slate-800 font-medium">ddl-auto=update (dev)</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-slate-500">Foreign Keys</span>
              <span className="text-slate-800 font-medium">ManyToOne (Employee → Department)</span>
            </div>
          </div>
        </div>
      </div>

      {/* REST API Endpoints Reference Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Core REST Endpoints</h2>
            <p className="text-xs text-slate-500">Postman-compatible JSON endpoints</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">GET</span>
            <p className="text-slate-800 font-semibold">/api/employees</p>
            <p className="text-[11px] text-slate-500 font-sans">Pagination, filters & sorting</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">POST</span>
            <p className="text-slate-800 font-semibold">/api/employees</p>
            <p className="text-[11px] text-slate-500 font-sans">Validation & unique email</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">PUT</span>
            <p className="text-slate-800 font-semibold">/api/employees/&#123;id&#125;</p>
            <p className="text-[11px] text-slate-500 font-sans">Full entity update</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">DELETE</span>
            <p className="text-slate-800 font-semibold">/api/employees/&#123;id&#125;</p>
            <p className="text-[11px] text-slate-500 font-sans">Delete employee</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">GET</span>
            <p className="text-slate-800 font-semibold">/api/departments</p>
            <p className="text-[11px] text-slate-500 font-sans">All departments + counts</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">GET</span>
            <p className="text-slate-800 font-semibold">/api/dashboard/stats</p>
            <p className="text-[11px] text-slate-500 font-sans">KPI aggregated metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
