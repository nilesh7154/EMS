import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import { departmentService } from '../services/departmentService';
import { getErrorMessage } from '../services/api';
import EmployeeForm from '../components/employees/EmployeeForm';
import { ArrowLeft, UserPlus, Users, Building2, FileText } from 'lucide-react';
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
        toast.error('Failed to load departments. Please refresh.');
        console.error(err);
      })
      .finally(() => setIsFetchingDepts(false));
  }, []);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const created = await employeeService.createEmployee(formData);
      toast.success(`🎉 ${created.fullName} has been onboarded successfully!`);
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

      {/* ── Page Header ── */}
      <div>
        <Link
          to="/employees"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Employees
        </Link>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
            <UserPlus className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Onboard New Employee
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Create a new employee profile and assign them to a department.
            </p>
          </div>
        </div>
      </div>

      {/* ── Info Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Users, label: 'Personal Info', desc: 'Name, email, phone, address', color: 'text-indigo-600 bg-indigo-50' },
          { icon: Building2, label: 'Employment', desc: 'Department, title, salary', color: 'text-violet-600 bg-violet-50' },
          { icon: FileText, label: 'Status', desc: 'Joining date & employment status', color: 'text-sky-600 bg-sky-50' }
        ].map(({ icon: Icon, label, desc, color }) => (
          <div key={label} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
            <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center shrink-0`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">{label}</p>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Form or Loading State ── */}
      {isFetchingDepts ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading departments...</p>
        </div>
      ) : departments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center gap-3 text-center">
          <Building2 className="w-10 h-10 text-slate-300" />
          <div>
            <p className="text-sm font-bold text-slate-700">No departments found</p>
            <p className="text-xs text-slate-500 mt-1">
              You need at least one department before adding an employee.
            </p>
          </div>
          <Link
            to="/departments"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors mt-1"
          >
            <Building2 className="w-3.5 h-3.5" />
            Create a Department
          </Link>
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
