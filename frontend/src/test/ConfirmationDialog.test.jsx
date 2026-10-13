import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConfirmationDialog from '../components/common/ConfirmationDialog';

describe('ConfirmationDialog Component', () => {
  it('renders confirmation dialog with employee name and warning message', () => {
    render(
      <ConfirmationDialog
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        targetName="Aarav Deshmukh (Senior Software Engineer)"
      />
    );

    expect(screen.getByText('Delete Employee')).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete this employee\?/i)).toBeInTheDocument();
    expect(screen.getByText('Aarav Deshmukh (Senior Software Engineer)')).toBeInTheDocument();
  });

  it('triggers onConfirm when clicking confirm button', () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmationDialog
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={handleConfirm}
        confirmText="Confirm Delete"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Confirm Delete' }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('triggers onClose when clicking cancel button', () => {
    const handleClose = vi.fn();
    render(
      <ConfirmationDialog
        isOpen={true}
        onClose={handleClose}
        onConfirm={vi.fn()}
        cancelText="Cancel"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
