import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Button from '../common/Button';

export default function EmployeeFilterBar({
  search,
  onSearchChange,
  departmentId,
  onDepartmentChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionToggle,
  departments = [],
  onClearFilters,
  hasActiveFilters = false
}) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, or employee ID..."
            className="w-full pl-10 pr-9 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Department Filter */}
          <select
            value={departmentId}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="text-xs sm:text-sm bg-white border border-slate-200 rounded-xl py-2 px-3 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="text-xs sm:text-sm bg-white border border-slate-200 rounded-xl py-2 px-3 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="text-xs sm:text-sm bg-white border border-slate-200 rounded-xl py-2 px-3 text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
          >
            <option value="joiningDate">Sort: Joining Date</option>
            <option value="name">Sort: Name</option>
            <option value="salary">Sort: Salary</option>
            <option value="id">Sort: Employee ID</option>
          </select>

          {/* Sort Direction Toggle */}
          <button
            onClick={onDirectionToggle}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
            title={`Sort Direction: ${direction === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            <ArrowUpDown className={`w-4 h-4 transition-transform ${direction === 'asc' ? 'rotate-180 text-indigo-600' : ''}`} />
          </button>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              icon={X}
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
