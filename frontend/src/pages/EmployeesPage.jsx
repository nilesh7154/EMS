import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import { departmentService } from '../services/departmentService';
import { getErrorMessage } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import EmployeeFilterBar from '../components/employees/EmployeeFilterBar';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeDetailModal from '../components/employees/EmployeeDetailModal';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import Pagination from '../components/common/Pagination';
import Button from '../components/common/Button';
import ErrorState from '../components/common/ErrorState';
import { UserPlus, Users, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Filters & Sorting state
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(searchInput, 350);
  const [departmentId, setDepartmentId] = useState(searchParams.get('departmentId') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'joiningDate');
  const [direction, setDirection] = useState(searchParams.get('direction') || 'desc');

  // Modal states
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch departments for filter dropdown
  useEffect(() => {
    departmentService.getAllDepartments()
      .then((data) => setDepartments(data))
      .catch((err) => console.error('Failed to load departments:', err));
  }, []);

  // Update query params in URL
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (departmentId) params.departmentId = departmentId;
    if (status) params.status = status;
    if (sortBy !== 'joiningDate') params.sortBy = sortBy;
    if (direction !== 'desc') params.direction = direction;
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, departmentId, status, sortBy, direction, setSearchParams]);

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await employeeService.getEmployees({
        page,
        size: pageSize,
        sortBy,
        direction,
        search: debouncedSearch,
        departmentId,
        status
      });

      setEmployees(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, sortBy, direction, debouncedSearch, departmentId, status]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Reset page to 0 when filters change
  const handleSearchChange = (val) => {
    setSearchInput(val);
    setPage(0);
  };

  const handleDepartmentChange = (val) => {
    setDepartmentId(val);
    setPage(0);
  };

  const handleStatusChange = (val) => {
    setStatus(val);
    setPage(0);
  };

  const handleSortByChange = (val) => {
    setSortBy(val);
    setPage(0);
  };

  const handleDirectionToggle = () => {
    setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(0);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setDepartmentId('');
    setStatus('');
    setSortBy('joiningDate');
    setDirection('desc');
    setPage(0);
  };

  const hasActiveFilters = Boolean(searchInput || departmentId || status || sortBy !== 'joiningDate' || direction !== 'desc');

  // Row action handlers
  const handleViewDetails = (emp) => {
    setSelectedEmployee(emp);
    setIsDetailModalOpen(true);
  };

  const handleDeleteRequest = (emp) => {
    setEmployeeToDelete(emp);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    setIsDeleting(true);
    try {
      await employeeService.deleteEmployee(employeeToDelete.id);
      toast.success(`Employee "${employeeToDelete.fullName}" successfully deleted`);
      setEmployeeToDelete(null);
      // Refresh employees list
      fetchEmployees();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Employee Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {totalElements} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your organization's talent records, designations, and departmental assignments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            onClick={fetchEmployees}
            icon={RefreshCw}
            disabled={isLoading}
            title="Refresh Directory"
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/employees/new')}
            icon={UserPlus}
          >
            Add Employee
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <EmployeeFilterBar
        search={searchInput}
        onSearchChange={handleSearchChange}
        departmentId={departmentId}
        onDepartmentChange={handleDepartmentChange}
        status={status}
        onStatusChange={handleStatusChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        direction={direction}
        onDirectionToggle={handleDirectionToggle}
        departments={departments}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Error state if server error */}
      {error && !employees.length ? (
        <ErrorState
          title="Could not load employees"
          message={error}
          onRetry={fetchEmployees}
          isRetrying={isLoading}
        />
      ) : (
        /* Employee Table */
        <div className="space-y-0">
          <EmployeeTable
            employees={employees}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            onDeleteRequest={handleDeleteRequest}
            onAddEmployee={() => navigate('/employees/new')}
          />

          {/* Pagination */}
          {!isLoading && employees.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              pageSize={pageSize}
              totalElements={totalElements}
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPage(0);
              }}
            />
          )}
        </div>
      )}

      {/* Detail Modal */}
      <EmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={Boolean(employeeToDelete)}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action is permanent and will remove the record from PostgreSQL."
        targetName={employeeToDelete ? `${employeeToDelete.fullName} (${employeeToDelete.jobTitle} - ${employeeToDelete.departmentName})` : ''}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
      />
    </div>
  );
}
