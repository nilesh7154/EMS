package com.example.employeemanagement.mapper;

import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.dto.EmployeeResponse;
import com.example.employeemanagement.entity.Department;
import com.example.employeemanagement.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public Employee toEntity(EmployeeRequest request, Department department) {
        if (request == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName().trim());
        employee.setLastName(request.getLastName().trim());
        employee.setEmail(request.getEmail().trim().toLowerCase());
        employee.setPhone(request.getPhone() != null ? request.getPhone().trim() : null);
        employee.setDepartment(department);
        employee.setJobTitle(request.getJobTitle().trim());
        employee.setSalary(request.getSalary());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setEmploymentStatus(request.getEmploymentStatus());
        employee.setAddress(request.getAddress() != null ? request.getAddress().trim() : null);
        employee.setProfileImageUrl(request.getProfileImageUrl() != null ? request.getProfileImageUrl().trim() : null);
        return employee;
    }

    public EmployeeResponse toResponse(Employee employee) {
        if (employee == null) {
            return null;
        }
        EmployeeResponse response = new EmployeeResponse();
        response.setId(employee.getId());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setFullName(employee.getFullName());
        response.setEmail(employee.getEmail());
        response.setPhone(employee.getPhone());
        if (employee.getDepartment() != null) {
            response.setDepartmentId(employee.getDepartment().getId());
            response.setDepartmentName(employee.getDepartment().getName());
        }
        response.setJobTitle(employee.getJobTitle());
        response.setSalary(employee.getSalary());
        response.setJoiningDate(employee.getJoiningDate());
        response.setEmploymentStatus(employee.getEmploymentStatus());
        response.setAddress(employee.getAddress());
        response.setProfileImageUrl(employee.getProfileImageUrl());
        response.setCreatedAt(employee.getCreatedAt());
        response.setUpdatedAt(employee.getUpdatedAt());
        return response;
    }

    public void updateEntityFromRequest(Employee employee, EmployeeRequest request, Department department) {
        if (employee == null || request == null) {
            return;
        }
        employee.setFirstName(request.getFirstName().trim());
        employee.setLastName(request.getLastName().trim());
        employee.setEmail(request.getEmail().trim().toLowerCase());
        employee.setPhone(request.getPhone() != null ? request.getPhone().trim() : null);
        employee.setDepartment(department);
        employee.setJobTitle(request.getJobTitle().trim());
        employee.setSalary(request.getSalary());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setEmploymentStatus(request.getEmploymentStatus());
        employee.setAddress(request.getAddress() != null ? request.getAddress().trim() : null);
        employee.setProfileImageUrl(request.getProfileImageUrl() != null ? request.getProfileImageUrl().trim() : null);
    }
}
