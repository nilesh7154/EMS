import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import {
  Save, X, User, Mail, Phone, Briefcase,
  IndianRupee, Calendar, Image, MapPin,
  CheckCircle, AlertCircle, Building2, Clock
} from 'lucide-react';

export default function EmployeeForm({
  defaultValues,
  departments = [],
  onSubmit,
  onCancel,
  isLoading = false,
  isEditMode = false
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      departmentId: '',
      jobTitle: '',
      salary: '',
      joiningDate: new Date().toISOString().split('T')[0],
      employmentStatus: 'ACTIVE',
      address: '',
      profileImageUrl: ''
    }
  });

  const profileImageUrl = watch('profileImageUrl');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const address = watch('address') || '';
  const [imgError, setImgError] = useState(false);

  const departmentOptions = departments.map((d) => ({
    value: String(d.id),
    label: d.name
  }));

  const statusOptions = [
    { value: 'ACTIVE', label: '🟢 Active' },
    { value: 'ON_LEAVE', label: '🟡 On Leave' },
    { value: 'INACTIVE', label: '🔴 Inactive' }
  ];

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      departmentId: Number(data.departmentId),
      salary: Number(data.salary)
    };
    onSubmit(payload);
  };

  // Derive initials for avatar preview
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

  const avatarColors = [
    'bg-indigo-500', 'bg-violet-500', 'bg-sky-500',
    'bg-emerald-500', 'bg-rose-500', 'bg-amber-500'
  ];
  const colorIndex = (firstName?.charCodeAt(0) || 0) % avatarColors.length;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>

      {/* ── Avatar Preview Card ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar */}
        <div className="shrink-0">
          {profileImageUrl && !imgError ? (
            <img
              src={profileImageUrl}
              alt="Profile preview"
              onError={() => setImgError(true)}
              onLoad={() => setImgError(false)}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-100 shadow"
            />
          ) : (
            <div className={`w-20 h-20 rounded-2xl ${avatarColors[colorIndex]} flex items-center justify-center ring-4 ring-indigo-100 shadow`}>
              <span className="text-white text-2xl font-bold tracking-wider">
                {initials || <User className="w-8 h-8 text-white/80" />}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-bold text-slate-900">
            {firstName || lastName
              ? `${firstName} ${lastName}`.trim()
              : isEditMode ? 'Edit Employee' : 'New Employee'}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {isEditMode
              ? 'Update the fields below and click Save to apply changes.'
              : 'Fill in the details below to onboard a new employee.'}
          </p>
          <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
            {isValid && Object.keys(touchedFields).length > 0 ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> Form is valid
              </span>
            ) : Object.keys(errors).length > 0 ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                <AlertCircle className="w-3.5 h-3.5" /> {Object.keys(errors).length} field(s) need attention
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Section 1: Personal Information ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
            <User className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
            <p className="text-xs text-slate-500">Basic identity details of the employee</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Input
                label="First Name"
                placeholder="e.g. Aarav"
                required
                icon={User}
                error={errors.firstName?.message}
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: { value: 2, message: 'At least 2 characters required' },
                  maxLength: { value: 60, message: 'Cannot exceed 60 characters' },
                  pattern: { value: /^[a-zA-Z\s'-]+$/, message: 'Only letters, spaces, hyphens allowed' }
                })}
              />
            </div>
            <div>
              <Input
                label="Last Name"
                placeholder="e.g. Deshmukh"
                required
                icon={User}
                error={errors.lastName?.message}
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: { value: 2, message: 'At least 2 characters required' },
                  maxLength: { value: 60, message: 'Cannot exceed 60 characters' },
                  pattern: { value: /^[a-zA-Z\s'-]+$/, message: 'Only letters, spaces, hyphens allowed' }
                })}
              />
            </div>
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="aarav.deshmukh@company.com"
              required
              icon={Mail}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address'
                }
              })}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 98201 12345"
              icon={Phone}
              error={errors.phone?.message}
              {...register('phone', {
                pattern: {
                  value: /^[+0-9\s\-().]{7,25}$/,
                  message: 'Enter a valid phone number'
                }
              })}
            />
          </div>

          {/* Profile Image URL */}
          <div>
            <Input
              label="Profile Image URL"
              type="url"
              placeholder="https://example.com/photo.jpg (optional)"
              icon={Image}
              error={errors.profileImageUrl?.message}
              {...register('profileImageUrl', {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: 'Must be a valid URL starting with http:// or https://'
                }
              })}
            />
            {profileImageUrl && !errors.profileImageUrl && (
              <p className="mt-1 text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Image URL set — preview shown above
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Residential Address
              <span className="ml-1 text-slate-400 font-normal normal-case tracking-normal">(Optional)</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <textarea
                rows={3}
                placeholder="Apartment No., Street, City, State, PIN Code..."
                className="block w-full rounded-lg border border-slate-300 text-sm py-2.5 pl-9 pr-3 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-colors resize-none"
                {...register('address', {
                  maxLength: { value: 500, message: 'Address cannot exceed 500 characters' }
                })}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              {errors.address
                ? <p className="text-xs text-rose-600 font-medium">{errors.address.message}</p>
                : <span />
              }
              <span className={`text-xs ${address.length > 480 ? 'text-rose-500' : 'text-slate-400'}`}>
                {address.length}/500
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Employment Details ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Employment Details</h3>
            <p className="text-xs text-slate-500">Department, role, and work configuration</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Department + Job Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Department"
              placeholder="Select a Department"
              required
              options={departmentOptions}
              error={errors.departmentId?.message}
              {...register('departmentId', {
                required: 'Please select a department'
              })}
            />
            <Input
              label="Job Title"
              placeholder="e.g. Senior Software Engineer"
              required
              icon={Briefcase}
              error={errors.jobTitle?.message}
              {...register('jobTitle', {
                required: 'Job title is required',
                minLength: { value: 2, message: 'At least 2 characters required' },
                maxLength: { value: 100, message: 'Cannot exceed 100 characters' }
              })}
            />
          </div>

          {/* Salary + Joining Date + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <Input
                label="Monthly Salary (₹)"
                type="number"
                step="500"
                min="1000"
                max="10000000"
                placeholder="75000"
                required
                icon={IndianRupee}
                error={errors.salary?.message}
                {...register('salary', {
                  required: 'Salary is required',
                  min: { value: 1000, message: 'Minimum salary is ₹1,000' },
                  max: { value: 10000000, message: 'Salary seems too high' }
                })}
              />
            </div>

            <div>
              <Input
                label="Joining Date"
                type="date"
                required
                icon={Calendar}
                error={errors.joiningDate?.message}
                {...register('joiningDate', {
                  required: 'Joining date is required'
                })}
              />
            </div>

            <div>
              <Select
                label="Employment Status"
                required
                options={statusOptions}
                error={errors.employmentStatus?.message}
                {...register('employmentStatus', {
                  required: 'Status is required'
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Required Fields Note ── */}
      <p className="text-xs text-slate-500 flex items-center gap-1">
        <span className="text-rose-500 font-bold">*</span>
        Fields marked with an asterisk are required.
      </p>

      {/* ── Action Buttons ── */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-1 pb-2">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          icon={X}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          icon={isLoading ? Clock : Save}
          className="w-full sm:w-auto"
        >
          {isLoading
            ? (isEditMode ? 'Updating...' : 'Saving...')
            : (isEditMode ? 'Update Employee' : 'Save Employee')}
        </Button>
      </div>
    </form>
  );
}
