package com.example.employeemanagement;

import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.dto.EmployeeResponse;
import com.example.employeemanagement.entity.Department;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.entity.EmploymentStatus;
import com.example.employeemanagement.exception.DuplicateEmailException;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.mapper.EmployeeMapper;
import com.example.employeemanagement.repository.DepartmentRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTests {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Spy
    private EmployeeMapper employeeMapper = new EmployeeMapper();

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Department department;
    private Employee employee;
    private EmployeeRequest employeeRequest;

    @BeforeEach
    void setUp() {
        department = new Department(1L, "Engineering", "Engineering Dept", "Tech Lead");

        employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("John");
        employee.setLastName("Doe");
        employee.setEmail("john.doe@example.com");
        employee.setPhone("+91 9876543210");
        employee.setDepartment(department);
        employee.setJobTitle("Software Engineer");
        employee.setSalary(new BigDecimal("75000.00"));
        employee.setJoiningDate(LocalDate.of(2025, 1, 15));
        employee.setEmploymentStatus(EmploymentStatus.ACTIVE);

        employeeRequest = new EmployeeRequest(
                "John", "Doe", "john.doe@example.com", "+91 9876543210",
                1L, "Software Engineer", new BigDecimal("75000.00"),
                LocalDate.of(2025, 1, 15), EmploymentStatus.ACTIVE, "123 Street", null
        );
    }

    @Test
    @DisplayName("Should successfully create an employee")
    void testCreateEmployee_Success() {
        when(employeeRepository.existsByEmailIgnoreCase("john.doe@example.com")).thenReturn(false);
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeRepository.save(any(Employee.class))).thenAnswer(invocation -> {
            Employee emp = invocation.getArgument(0);
            emp.setId(10L);
            return emp;
        });

        EmployeeResponse response = employeeService.createEmployee(employeeRequest);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("John", response.getFirstName());
        assertEquals("john.doe@example.com", response.getEmail());
        assertEquals("Engineering", response.getDepartmentName());
        verify(employeeRepository).save(any(Employee.class));
    }

    @Test
    @DisplayName("Should throw DuplicateEmailException when email already exists during creation")
    void testCreateEmployee_DuplicateEmail() {
        when(employeeRepository.existsByEmailIgnoreCase("john.doe@example.com")).thenReturn(true);

        assertThrows(DuplicateEmailException.class, () -> employeeService.createEmployee(employeeRequest));
        verify(employeeRepository, never()).save(any(Employee.class));
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when department is invalid during creation")
    void testCreateEmployee_InvalidDepartment() {
        when(employeeRepository.existsByEmailIgnoreCase("john.doe@example.com")).thenReturn(false);
        when(departmentRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> employeeService.createEmployee(employeeRequest));
        verify(employeeRepository, never()).save(any(Employee.class));
    }

    @Test
    @DisplayName("Should successfully retrieve employee by ID")
    void testGetEmployeeById_Success() {
        when(employeeRepository.findWithDepartmentById(1L)).thenReturn(Optional.of(employee));

        EmployeeResponse response = employeeService.getEmployeeById(1L);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("John Doe", response.getFullName());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when employee does not exist")
    void testGetEmployeeById_NotFound() {
        when(employeeRepository.findWithDepartmentById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> employeeService.getEmployeeById(99L));
    }

    @Test
    @DisplayName("Should successfully update employee")
    void testUpdateEmployee_Success() {
        when(employeeRepository.findWithDepartmentById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.existsByEmailIgnoreCaseAndIdNot("john.doe@example.com", 1L)).thenReturn(false);
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        employeeRequest.setJobTitle("Staff Engineer");
        EmployeeResponse response = employeeService.updateEmployee(1L, employeeRequest);

        assertNotNull(response);
        assertEquals("Staff Engineer", response.getJobTitle());
        verify(employeeRepository).save(employee);
    }

    @Test
    @DisplayName("Should throw DuplicateEmailException when updating to another employee's email")
    void testUpdateEmployee_DuplicateEmail() {
        when(employeeRepository.findWithDepartmentById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.existsByEmailIgnoreCaseAndIdNot("john.doe@example.com", 1L)).thenReturn(true);

        assertThrows(DuplicateEmailException.class, () -> employeeService.updateEmployee(1L, employeeRequest));
        verify(employeeRepository, never()).save(any(Employee.class));
    }

    @Test
    @DisplayName("Should successfully delete employee")
    void testDeleteEmployee_Success() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        employeeService.deleteEmployee(1L);

        verify(employeeRepository).delete(employee);
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when deleting non-existent employee")
    void testDeleteEmployee_NotFound() {
        when(employeeRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> employeeService.deleteEmployee(99L));
        verify(employeeRepository, never()).delete(any(Employee.class));
    }
}
