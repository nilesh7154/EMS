package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);

    @Query("SELECT d.id, d.name, d.description, d.departmentHead, d.createdAt, d.updatedAt, COUNT(e) " +
           "FROM Department d LEFT JOIN Employee e ON e.department.id = d.id " +
           "GROUP BY d.id, d.name, d.description, d.departmentHead, d.createdAt, d.updatedAt " +
           "ORDER BY d.name ASC")
    List<Object[]> findAllWithEmployeeCount();
}
