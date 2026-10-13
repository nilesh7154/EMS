import React from 'react';
import { Building2, User, Users, Edit3, Trash2 } from 'lucide-react';

export default function DepartmentCard({
  department,
  onEdit,
  onDelete
}) {
  const hasEmployees = department.employeeCount > 0;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(department)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
              title="Edit Department"
              aria-label={`Edit ${department.name}`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(department)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title={hasEmployees ? `Cannot delete: has ${department.employeeCount} assigned employees` : 'Delete Department'}
              aria-label={`Delete ${department.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {department.name}
        </h3>

        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {department.description || 'No description provided.'}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-600">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate max-w-[120px] sm:max-w-[150px]">
            {department.departmentHead || 'No Head Assigned'}
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold ${
            hasEmployees
              ? 'bg-indigo-50 text-indigo-700'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          <Users className="w-3 h-3" />
          {department.employeeCount} {department.employeeCount === 1 ? 'member' : 'members'}
        </span>
      </div>
    </div>
  );
}
