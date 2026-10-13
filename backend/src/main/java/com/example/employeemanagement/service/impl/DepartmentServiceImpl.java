package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.dto.DepartmentRequest;
import com.example.employeemanagement.dto.DepartmentResponse;
import com.example.employeemanagement.entity.Department;
import com.example.employeemanagement.exception.BadRequestException;
import com.example.employeemanagement.exception.DepartmentNotEmptyException;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.mapper.DepartmentMapper;
import com.example.employeemanagement.repository.DepartmentRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.service.DepartmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentMapper departmentMapper;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository,
                                  EmployeeRepository employeeRepository,
                                  DepartmentMapper departmentMapper) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
        this.departmentMapper = departmentMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentResponse> getAllDepartments() {
        List<Object[]> rows = departmentRepository.findAllWithEmployeeCount();
        List<DepartmentResponse> responses = new ArrayList<>();
        for (Object[] row : rows) {
            DepartmentResponse dto = new DepartmentResponse();
            dto.setId((Long) row[0]);
            dto.setName((String) row[1]);
            dto.setDescription((String) row[2]);
            dto.setDepartmentHead((String) row[3]);
            dto.setCreatedAt((java.time.LocalDateTime) row[4]);
            dto.setUpdatedAt((java.time.LocalDateTime) row[5]);
            dto.setEmployeeCount((Long) row[6]);
            responses.add(dto);
        }
        return responses;
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentResponse getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        long count = employeeRepository.countByDepartmentId(id);
        return departmentMapper.toResponse(department, count);
    }

    @Override
    @Transactional
    public DepartmentResponse createDepartment(DepartmentRequest request) {
        if (departmentRepository.existsByNameIgnoreCase(request.getName().trim())) {
            throw new BadRequestException("Department with name '" + request.getName().trim() + "' already exists");
        }
        Department department = departmentMapper.toEntity(request);
        Department saved = departmentRepository.save(department);
        return departmentMapper.toResponse(saved, 0L);
    }

    @Override
    @Transactional
    public DepartmentResponse updateDepartment(Long id, DepartmentRequest request) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));

        if (departmentRepository.existsByNameIgnoreCaseAndIdNot(request.getName().trim(), id)) {
            throw new BadRequestException("Another department with name '" + request.getName().trim() + "' already exists");
        }

        departmentMapper.updateEntityFromRequest(department, request);
        Department updated = departmentRepository.save(department);
        long count = employeeRepository.countByDepartmentId(id);
        return departmentMapper.toResponse(updated, count);
    }

    @Override
    @Transactional
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));

        long employeeCount = employeeRepository.countByDepartmentId(id);
        if (employeeCount > 0) {
            throw new DepartmentNotEmptyException(
                    String.format("Cannot delete department '%s' because it currently has %d assigned employee(s). Please reassign them before deleting.",
                            department.getName(), employeeCount));
        }

        departmentRepository.delete(department);
    }
}
