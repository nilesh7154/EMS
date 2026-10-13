import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { getInitials, getAvatarColor } from '../../utils/avatarHelper';
import { Eye, Edit3, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import LoadingSkeleton from '../common/LoadingSkeleton';

export default function EmployeeTable({
  employees = [],
  isLoading = false,
  onViewDetails,
  onDeleteRequest,
  onAddEmployee
}) {
  if (isLoading) {
    return <LoadingSkeleton type="table" count={6} />;
  }

  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees found"
        description="Try adjusting your search criteria, clearing active filters, or add a new employee."
        actionLabel="Add Employee"
        onAction={onAddEmployee}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Desktop / Tablet Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4">Emp ID</th>
              <th className="py-3.5 px-4">Employee</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Contact</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Job Title</th>
              <th className="py-3.5 px-4 hidden xl:table-cell">Joined</th>
              <th className="py-3.5 px-4">Salary</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {employees.map((emp) => {
              const initials = getInitials(emp.firstName, emp.lastName);
              const palette = getAvatarColor(emp.fullName || emp.firstName);

              return (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-500 font-semibold">
                    #{emp.id}
                  </td>

                  {/* Employee Name & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {emp.profileImageUrl ? (
                        <img
                          src={emp.profileImageUrl}
                          alt={emp.fullName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-9 h-9 rounded-full ${palette.bg} ${palette.text} font-bold text-xs flex items-center justify-center shrink-0 border border-white shadow-2xs ${
                          emp.profileImageUrl ? 'hidden' : 'flex'
                        }`}
                      >
                        {initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <button
                          onClick={() => onViewDetails(emp)}
                          className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors text-left truncate cursor-pointer"
                        >
                          {emp.fullName}
                        </button>
                        <span className="text-xs text-slate-400 truncate md:hidden">
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Contact (Email & Phone) */}
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <div className="flex flex-col text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{emp.email}</span>
                      </div>
                      {emp.phone && (
                        <div className="flex items-center gap-1.5 text-slate-400 mt-0.5 truncate">
                          <Phone className="w-3.5 h-3.5 shrink-0" />
                          <span>{emp.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {emp.departmentName || '—'}
                    </span>
                  </td>

                  {/* Job Title */}
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-700 hidden lg:table-cell">
                    {emp.jobTitle}
                  </td>

                  {/* Joining Date */}
                  <td className="py-3.5 px-4 text-xs text-slate-500 hidden xl:table-cell">
                    {formatDate(emp.joiningDate)}
                  </td>

                  {/* Salary */}
                  <td className="py-3.5 px-4 font-semibold text-slate-900 text-xs sm:text-sm">
                    {formatCurrencyINR(emp.salary)}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={emp.employmentStatus} />
                  </td>

                  {/* Row Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onViewDetails(emp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="View Employee Details"
                        aria-label={`View details of ${emp.fullName}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <Link
                        to={`/employees/${emp.id}/edit`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Edit Employee"
                        aria-label={`Edit ${emp.fullName}`}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => onDeleteRequest(emp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Employee"
                        aria-label={`Delete ${emp.fullName}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
