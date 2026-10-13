package com.example.employeemanagement.mapper;

import com.example.employeemanagement.dto.DepartmentRequest;
import com.example.employeemanagement.dto.DepartmentResponse;
import com.example.employeemanagement.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentMapper {

    public Department toEntity(DepartmentRequest request) {
        if (request == null) {
            return null;
        }
        Department department = new Department();
        department.setName(request.getName().trim());
        department.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        department.setDepartmentHead(request.getDepartmentHead() != null ? request.getDepartmentHead().trim() : null);
        return department;
    }

    public DepartmentResponse toResponse(Department department, Long employeeCount) {
        if (department == null) {
            return null;
        }
        DepartmentResponse response = new DepartmentResponse();
        response.setId(department.getId());
        response.setName(department.getName());
        response.setDescription(department.getDescription());
        response.setDepartmentHead(department.getDepartmentHead());
        response.setEmployeeCount(employeeCount != null ? employeeCount : 0L);
        response.setCreatedAt(department.getCreatedAt());
        response.setUpdatedAt(department.getUpdatedAt());
        return response;
    }

    public void updateEntityFromRequest(Department department, DepartmentRequest request) {
        if (department == null || request == null) {
            return;
        }
        department.setName(request.getName().trim());
        department.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        department.setDepartmentHead(request.getDepartmentHead() != null ? request.getDepartmentHead().trim() : null);
    }
}
