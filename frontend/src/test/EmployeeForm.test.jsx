import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmployeeForm from '../components/employees/EmployeeForm';

const mockDepartments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Product & Design' }
];

describe('EmployeeForm Component', () => {
  it('renders all form input fields', () => {
    render(
      <EmployeeForm
        departments={mockDepartments}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Salary/i)).toBeInTheDocument();
  });

  it('displays inline validation errors when submitting empty required fields', async () => {
    const handleSubmit = vi.fn();
    render(
      <EmployeeForm
        departments={mockDepartments}
        onSubmit={handleSubmit}
        onCancel={vi.fn()}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Save Employee/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits valid employee data successfully', async () => {
    const handleSubmit = vi.fn();
    render(
      <EmployeeForm
        departments={mockDepartments}
        onSubmit={handleSubmit}
        onCancel={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Rohan' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Mehta' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'rohan.mehta@example.com' } });
    fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Staff Engineer' } });
    fireEvent.change(screen.getByLabelText(/Monthly Salary/i), { target: { value: '120000' } });

    const submitBtn = screen.getByRole('button', { name: /Save Employee/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });

    const submittedData = handleSubmit.mock.calls[0][0];
    expect(submittedData.firstName).toBe('Rohan');
    expect(submittedData.lastName).toBe('Mehta');
    expect(submittedData.departmentId).toBe(1);
    expect(submittedData.salary).toBe(120000);
  });
});
