import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Save, X, User, Mail, Phone, Briefcase, IndianRupee, Calendar, Image, MapPin } from 'lucide-react';

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
    formState: { errors }
  } = useForm({
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

  const departmentOptions = departments.map((d) => ({
    value: String(d.id),
    label: d.name
  }));

  const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'ON_LEAVE', label: 'On Leave' },
    { value: 'INACTIVE', label: 'Inactive' }
  ];

  const handleFormSubmit = (data) => {
    // Format numeric values
    const payload = {
      ...data,
      departmentId: Number(data.departmentId),
      salary: Number(data.salary)
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">
            {isEditMode ? 'Edit Employee Details' : 'Personal & Work Information'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Please fill in the required fields to {isEditMode ? 'update' : 'create'} the employee record.
          </p>
        </div>

        {/* Section 1: Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="First Name"
            placeholder="e.g. Aarav"
            required
            icon={User}
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'First name must have at least 2 characters' },
              maxLength: { value: 60, message: 'First name cannot exceed 60 characters' }
            })}
          />

          <Input
            label="Last Name"
            placeholder="e.g. Deshmukh"
            required
            icon={User}
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Last name must have at least 2 characters' },
              maxLength: { value: 60, message: 'Last name cannot exceed 60 characters' }
            })}
          />
        </div>

        {/* Section 2: Contact Info */}
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
                message: 'Please enter a valid email address'
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
                message: 'Enter a valid phone number format'
              }
            })}
          />
        </div>

        {/* Section 3: Job & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            label="Department"
            placeholder="Select Department"
            required
            options={departmentOptions}
            error={errors.departmentId?.message}
            {...register('departmentId', {
              required: 'Department selection is required'
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
              minLength: { value: 2, message: 'Job title must have at least 2 characters' }
            })}
          />
        </div>

        {/* Section 4: Compensation & Joining Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Input
            label="Monthly Salary (₹)"
            type="number"
            step="1000"
            min="1000"
            placeholder="75000"
            required
            icon={IndianRupee}
            error={errors.salary?.message}
            {...register('salary', {
              required: 'Salary is required',
              min: { value: 1000, message: 'Salary must be at least ₹1,000' }
            })}
          />

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

          <Select
            label="Employment Status"
            placeholder=""
            required
            options={statusOptions}
            error={errors.employmentStatus?.message}
            {...register('employmentStatus', {
              required: 'Employment status is required'
            })}
          />
        </div>

        {/* Section 5: Profile Image URL */}
        <Input
          label="Profile Image URL"
          type="url"
          placeholder="https://images.unsplash.com/... (optional)"
          icon={Image}
          helperText="Direct image URL for avatar preview"
          error={errors.profileImageUrl?.message}
          {...register('profileImageUrl')}
        />

        {/* Section 6: Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Residential Address (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              placeholder="Apartment, Street, City, State, PIN..."
              className="block w-full rounded-lg border border-slate-300 text-sm py-2.5 px-3 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
              {...register('address', {
                maxLength: { value: 500, message: 'Address cannot exceed 500 characters' }
              })}
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          icon={X}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          icon={Save}
        >
          {isEditMode ? 'Update Employee' : 'Save Employee'}
        </Button>
      </div>
    </form>
  );
}
