import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import { getInitials, getAvatarColor } from '../../utils/avatarHelper';
import { ArrowRight, UserCheck } from 'lucide-react';

export default function RecentEmployeesList({ employees = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-40 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                <div className="space-y-1.5">
                  <div className="h-4 bg-slate-200 rounded w-28" />
                  <div className="h-3 bg-slate-100 rounded w-20" />
                </div>
              </div>
              <div className="h-6 bg-slate-200 rounded-full w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Recent Onboardings
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest employees who joined the company
          </p>
        </div>
        <Link
          to="/employees"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
          <UserCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-500">No employees onboarded yet</p>
          <Link
            to="/employees/new"
            className="text-xs font-semibold text-indigo-600 hover:underline mt-1 inline-block"
          >
            Add first employee
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {employees.map((emp) => {
            const initials = getInitials(emp.firstName, emp.lastName);
            const palette = getAvatarColor(emp.fullName || emp.firstName);

            return (
              <div
                key={emp.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 -mx-2 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  {emp.profileImageUrl ? (
                    <img
                      src={emp.profileImageUrl}
                      alt={emp.fullName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-10 h-10 rounded-full ${palette.bg} ${palette.text} font-bold text-xs flex items-center justify-center shrink-0 border border-white shadow-2xs ${
                      emp.profileImageUrl ? 'hidden' : 'flex'
                    }`}
                  >
                    {initials}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-900 truncate">
                      {emp.fullName}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {emp.jobTitle} • <span className="font-medium text-slate-700">{emp.departmentName}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span className="text-xs text-slate-400 font-medium hidden md:inline-block">
                    {formatDate(emp.joiningDate)}
                  </span>
                  <StatusBadge status={emp.employmentStatus} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
