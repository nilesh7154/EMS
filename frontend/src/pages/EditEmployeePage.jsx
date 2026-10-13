import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import { departmentService } from '../services/departmentService';
import { getErrorMessage } from '../services/api';
import EmployeeForm from '../components/employees/EmployeeForm';
import ErrorState from '../components/common/ErrorState';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingEmployee(true);
      setError(null);
      try {
        const [empData, deptList] = await Promise.all([
          employeeService.getEmployeeById(id),
          departmentService.getAllDepartments()
        ]);
        setEmployee(empData);
        setDepartments(deptList);
      } catch (err) {
        const msg = getErrorMessage(err);
        setError(msg);
        toast.error(msg);
      } finally {
        setIsLoadingEmployee(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const updated = await employeeService.updateEmployee(id, formData);
      toast.success(`Employee "${updated.fullName}" successfully updated!`);
      navigate('/employees');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error && !employee) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Link
          to="/employees"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Employees
        </Link>
        <ErrorState
          title="Employee Not Found"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (isLoadingEmployee) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-48 mb-2" />
        <div className="bg-white rounded-2xl p-8 border border-slate-200">
          <div className="h-10 bg-slate-100 rounded mb-4" />
          <div className="h-10 bg-slate-100 rounded mb-4" />
          <div className="h-10 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }

  const defaultValues = {
    firstName: employee.firstName || '',
    lastName: employee.lastName || '',
    email: employee.email || '',
    phone: employee.phone || '',
    departmentId: employee.departmentId ? String(employee.departmentId) : '',
    jobTitle: employee.jobTitle || '',
    salary: employee.salary || '',
    joiningDate: employee.joiningDate || '',
    employmentStatus: employee.employmentStatus || 'ACTIVE',
    address: employee.address || '',
    profileImageUrl: employee.profileImageUrl || ''
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link
          to="/employees"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Employees
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Edit Employee: {employee.fullName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Update employee position, departmental allocation, or contact details.
        </p>
      </div>

      <EmployeeForm
        defaultValues={defaultValues}
        departments={departments}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/employees')}
        isLoading={isSubmitting}
        isEditMode={true}
      />
    </div>
  );
}
