import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import { departmentService } from '../services/departmentService';
import { getErrorMessage } from '../services/api';
import EmployeeForm from '../components/employees/EmployeeForm';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingDepts, setIsFetchingDepts] = useState(true);

  useEffect(() => {
    departmentService.getAllDepartments()
      .then((data) => setDepartments(data))
      .catch((err) => {
        toast.error('Failed to load departments');
        console.error(err);
      })
      .finally(() => setIsFetchingDepts(false));
  }, []);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const created = await employeeService.createEmployee(formData);
      toast.success(`Employee "${created.fullName}" onboarded successfully!`);
      navigate('/employees');
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top back navigation */}
      <div>
        <Link
          to="/employees"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Employees
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Onboard New Employee
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Create an employee profile, assign them to a department, and set compensation.
        </p>
      </div>

      {isFetchingDepts ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 animate-pulse text-center">
          <p className="text-sm text-slate-400">Loading department configurations...</p>
        </div>
      ) : (
        <EmployeeForm
          departments={departments}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/employees')}
          isLoading={isLoading}
          isEditMode={false}
        />
      )}
    </div>
  );
}
