import React, { useState, useEffect } from 'react';
import { departmentService } from '../services/departmentService';
import { getErrorMessage } from '../services/api';
import DepartmentCard from '../components/departments/DepartmentCard';
import DepartmentModal from '../components/departments/DepartmentModal';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import { Building2, Plus, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & Dialog state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deptToDelete, setDeptToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDepartments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await departmentService.getAllDepartments();
      setDepartments(data);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dept) => {
    setEditingDepartment(dept);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingDepartment) {
        const updated = await departmentService.updateDepartment(editingDepartment.id, formData);
        toast.success(`Department "${updated.name}" updated successfully!`);
      } else {
        const created = await departmentService.createDepartment(formData);
        toast.success(`Department "${created.name}" created successfully!`);
      }
      setIsModalOpen(false);
      setEditingDepartment(null);
      fetchDepartments();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequest = (dept) => {
    if (dept.employeeCount > 0) {
      toast.error(
        `Cannot delete "${dept.name}" because it currently has ${dept.employeeCount} assigned employee(s). Please reassign them first.`
      );
      return;
    }
    setDeptToDelete(dept);
  };

  const handleConfirmDelete = async () => {
    if (!deptToDelete) return;
    setIsDeleting(true);
    try {
      await departmentService.deleteDepartment(deptToDelete.id);
      toast.success(`Department "${deptToDelete.name}" successfully deleted!`);
      setDeptToDelete(null);
      fetchDepartments();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Departments
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {departments.length} Units
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Organize company divisions, teams, and appointed department heads.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            onClick={fetchDepartments}
            icon={RefreshCw}
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            onClick={handleOpenCreateModal}
            icon={Plus}
          >
            Add Department
          </Button>
        </div>
      </div>

      {/* Content */}
      {error && !departments.length ? (
        <ErrorState
          title="Failed to load departments"
          message={error}
          onRetry={fetchDepartments}
          isRetrying={isLoading}
        />
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="h-10 bg-slate-100 rounded-xl w-10 mb-4" />
              <div className="h-5 bg-slate-200 rounded w-32 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-full mb-1" />
              <div className="h-3 bg-slate-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : departments.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No departments found"
          description="Create your first department to start assigning employees and organizing teams."
          actionLabel="Add Department"
          onAction={handleOpenCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDepartment(null);
        }}
        onSubmit={handleModalSubmit}
        initialData={editingDepartment}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={Boolean(deptToDelete)}
        onClose={() => setDeptToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Department"
        message="Are you sure you want to delete this department? This operation is permanent."
        targetName={deptToDelete ? deptToDelete.name : ''}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
      />
    </div>
  );
}
