import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { Building2, User, Save } from 'lucide-react';

export default function DepartmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false
}) {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      departmentHead: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        departmentHead: initialData.departmentHead || ''
      });
    } else {
      reset({
        name: '',
        description: '',
        departmentHead: ''
      });
    }
  }, [initialData, reset, isOpen]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Department' : 'Create New Department'}
      subtitle={isEditing ? `Modifying ${initialData.name}` : 'Define organizational unit and assign department head'}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Department Name"
          placeholder="e.g. Engineering"
          required
          icon={Building2}
          error={errors.name?.message}
          {...register('name', {
            required: 'Department name is required',
            minLength: { value: 2, message: 'Name must have at least 2 characters' },
            maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
          })}
        />

        <Input
          label="Department Head"
          placeholder="e.g. Priya Sharma (optional)"
          icon={User}
          error={errors.departmentHead?.message}
          {...register('departmentHead', {
            maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
          })}
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief overview of responsibilities and scope..."
            className="block w-full rounded-lg border border-slate-300 text-sm py-2 px-3 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
            {...register('description', {
              maxLength: { value: 1000, message: 'Description cannot exceed 1000 characters' }
            })}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            icon={Save}
          >
            {isEditing ? 'Update Department' : 'Create Department'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
