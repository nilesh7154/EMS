package com.example.employeemanagement;

import com.example.employeemanagement.dto.DepartmentRequest;
import com.example.employeemanagement.dto.DepartmentResponse;
import com.example.employeemanagement.entity.Department;
import com.example.employeemanagement.exception.BadRequestException;
import com.example.employeemanagement.exception.DepartmentNotEmptyException;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.mapper.DepartmentMapper;
import com.example.employeemanagement.repository.DepartmentRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.service.impl.DepartmentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DepartmentServiceTests {

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Spy
    private DepartmentMapper departmentMapper = new DepartmentMapper();

    @InjectMocks
    private DepartmentServiceImpl departmentService;

    private Department department;
    private DepartmentRequest departmentRequest;

    @BeforeEach
    void setUp() {
        department = new Department(1L, "Engineering", "Engineering description", "Lead Engineer");
        departmentRequest = new DepartmentRequest("Engineering", "Engineering description", "Lead Engineer");
    }

    @Test
    @DisplayName("Should successfully create department")
    void testCreateDepartment_Success() {
        when(departmentRepository.existsByNameIgnoreCase("Engineering")).thenReturn(false);
        when(departmentRepository.save(any(Department.class))).thenAnswer(invocation -> {
            Department d = invocation.getArgument(0);
            d.setId(10L);
            return d;
        });

        DepartmentResponse response = departmentService.createDepartment(departmentRequest);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("Engineering", response.getName());
        verify(departmentRepository).save(any(Department.class));
    }

    @Test
    @DisplayName("Should throw BadRequestException when department name already exists")
    void testCreateDepartment_DuplicateName() {
        when(departmentRepository.existsByNameIgnoreCase("Engineering")).thenReturn(true);

        assertThrows(BadRequestException.class, () -> departmentService.createDepartment(departmentRequest));
        verify(departmentRepository, never()).save(any(Department.class));
    }

    @Test
    @DisplayName("Should throw DepartmentNotEmptyException when deleting department with employees")
    void testDeleteDepartment_ConflictWhenNotEmpty() {
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeRepository.countByDepartmentId(1L)).thenReturn(3L);

        assertThrows(DepartmentNotEmptyException.class, () -> departmentService.deleteDepartment(1L));
        verify(departmentRepository, never()).delete(any(Department.class));
    }

    @Test
    @DisplayName("Should successfully delete department when no employees assigned")
    void testDeleteDepartment_Success() {
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeRepository.countByDepartmentId(1L)).thenReturn(0L);

        departmentService.deleteDepartment(1L);

        verify(departmentRepository).delete(department);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when department does not exist")
    void testGetDepartmentById_NotFound() {
        when(departmentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> departmentService.getDepartmentById(99L));
    }
}
