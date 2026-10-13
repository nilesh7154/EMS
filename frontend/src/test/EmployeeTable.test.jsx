import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import EmployeeTable from '../components/employees/EmployeeTable';

const mockEmployees = [
  {
    id: 1,
    firstName: 'Aarav',
    lastName: 'Deshmukh',
    fullName: 'Aarav Deshmukh',
    email: 'aarav@peopledesk.io',
    phone: '+91 98201 12345',
    departmentId: 1,
    departmentName: 'Engineering',
    jobTitle: 'Senior Software Engineer',
    salary: 145000,
    joiningDate: '2026-05-12',
    employmentStatus: 'ACTIVE'
  },
  {
    id: 2,
    firstName: 'Priya',
    lastName: 'Sharma',
    fullName: 'Priya Sharma',
    email: 'priya@peopledesk.io',
    phone: '+91 98110 54321',
    departmentId: 1,
    departmentName: 'Engineering',
    jobTitle: 'Engineering Manager',
    salary: 185000,
    joiningDate: '2026-05-20',
    employmentStatus: 'ON_LEAVE'
  }
];

describe('EmployeeTable Component', () => {
  it('renders employee table with employee details and INR salary formatting', () => {
    render(
      <BrowserRouter>
        <EmployeeTable
          employees={mockEmployees}
          onViewDetails={vi.fn()}
          onDeleteRequest={vi.fn()}
        />
      </BrowserRouter>
    );

    // Verify employee names
    expect(screen.getByText('Aarav Deshmukh')).toBeInTheDocument();
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();

    // Verify department badges
    expect(screen.getAllByText('Engineering').length).toBeGreaterThanOrEqual(1);

    // Verify statuses
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('On Leave')).toBeInTheDocument();
  });

  it('triggers onViewDetails when clicking employee name or view action', () => {
    const handleView = vi.fn();
    render(
      <BrowserRouter>
        <EmployeeTable
          employees={mockEmployees}
          onViewDetails={handleView}
          onDeleteRequest={vi.fn()}
        />
      </BrowserRouter>
    );

    const nameBtn = screen.getByText('Aarav Deshmukh');
    fireEvent.click(nameBtn);
    expect(handleView).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('triggers onDeleteRequest when clicking delete action button', () => {
    const handleDelete = vi.fn();
    render(
      <BrowserRouter>
        <EmployeeTable
          employees={mockEmployees}
          onViewDetails={vi.fn()}
          onDeleteRequest={handleDelete}
        />
      </BrowserRouter>
    );

    const deleteBtns = screen.getAllByTitle('Delete Employee');
    fireEvent.click(deleteBtns[0]);
    expect(handleDelete).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('renders empty state when no employees are provided', () => {
    render(
      <BrowserRouter>
        <EmployeeTable
          employees={[]}
          onViewDetails={vi.fn()}
          onDeleteRequest={vi.fn()}
          onAddEmployee={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/No employees found/i)).toBeInTheDocument();
  });
});
