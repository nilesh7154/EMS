import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { getInitials, getAvatarColor } from '../../utils/avatarHelper';
import {
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  IndianRupee,
  MapPin,
  Edit3
} from 'lucide-react';

export default function EmployeeDetailModal({
  isOpen,
  onClose,
  employee
}) {
  const navigate = useNavigate();

  if (!employee) return null;

  const initials = getInitials(employee.firstName, employee.lastName);
  const palette = getAvatarColor(employee.fullName || employee.firstName);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Employee Profile"
      subtitle={`System Record #${employee.id}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
          {employee.profileImageUrl ? (
            <img
              src={employee.profileImageUrl}
              alt={employee.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-16 h-16 rounded-full ${palette.bg} ${palette.text} font-bold text-lg flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${
              employee.profileImageUrl ? 'hidden' : 'flex'
            }`}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-900 truncate">
                {employee.fullName}
              </h2>
              <StatusBadge status={employee.employmentStatus} />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {employee.jobTitle} • <span className="text-indigo-600 font-semibold">{employee.departmentName}</span>
            </p>
          </div>
        </div>

        {/* Detailed Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Email */}
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Email Address
            </span>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{employee.email}</span>
            </div>
          </div>

          {/* Phone */}
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Phone Number
            </span>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{employee.phone || 'Not provided'}</span>
            </div>
          </div>

          {/* Department */}
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Department
            </span>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{employee.departmentName || '—'}</span>
            </div>
          </div>

          {/* Job Title */}
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Job Title
            </span>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{employee.jobTitle}</span>
            </div>
          </div>

          {/* Joining Date */}
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Joining Date
            </span>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{formatDate(employee.joiningDate)}</span>
            </div>
          </div>

          {/* Salary */}
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Compensation
            </span>
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <IndianRupee className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{formatCurrencyINR(employee.salary)} / month</span>
            </div>
          </div>
        </div>

        {/* Address */}
        {employee.address && (
          <div className="p-3 rounded-xl border border-slate-100 bg-white text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              Residential Address
            </span>
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{employee.address}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose}>
            Back
          </Button>
          <Button
            variant="primary"
            icon={Edit3}
            onClick={() => {
              onClose();
              navigate(`/employees/${employee.id}/edit`);
            }}
          >
            Edit Employee
          </Button>
        </div>
      </div>
    </Modal>
  );
}
