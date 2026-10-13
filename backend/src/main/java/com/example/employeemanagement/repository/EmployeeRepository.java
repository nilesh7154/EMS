package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.entity.EmploymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    @EntityGraph(attributePaths = {"department"})
    Optional<Employee> findWithDepartmentById(Long id);

    @Override
    @EntityGraph(attributePaths = {"department"})
    Page<Employee> findAll(Specification<Employee> spec, Pageable pageable);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    long countByDepartmentId(Long departmentId);

    long countByEmploymentStatus(EmploymentStatus status);

    long countByJoiningDateGreaterThanEqual(LocalDate date);

    @EntityGraph(attributePaths = {"department"})
    List<Employee> findTop5ByOrderByJoiningDateDescIdDesc();

    @Query("SELECT d.id, d.name, COUNT(e) FROM Department d LEFT JOIN Employee e ON e.department.id = d.id GROUP BY d.id, d.name ORDER BY COUNT(e) DESC, d.name ASC")
    List<Object[]> getDepartmentEmployeeCounts();

    @Query("SELECT e.joiningDate FROM Employee e WHERE e.joiningDate IS NOT NULL ORDER BY e.joiningDate ASC")
    List<LocalDate> findAllJoiningDates();
}
