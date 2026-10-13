package com.example.employeemanagement.service;

import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.dto.EmployeeResponse;
import com.example.employeemanagement.dto.PageResponse;
import com.example.employeemanagement.entity.EmploymentStatus;

public interface EmployeeService {

    PageResponse<EmployeeResponse> getEmployees(int page, int size, String sortBy, String direction,
                                               String search, Long departmentId, EmploymentStatus status);

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse createEmployee(EmployeeRequest request);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);
}
