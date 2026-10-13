package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.dto.DashboardStatsResponse;
import com.example.employeemanagement.dto.DepartmentDistributionDto;
import com.example.employeemanagement.dto.EmployeeResponse;
import com.example.employeemanagement.dto.JoiningTrendDto;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.entity.EmploymentStatus;
import com.example.employeemanagement.mapper.EmployeeMapper;
import com.example.employeemanagement.repository.DepartmentRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.service.DashboardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeMapper employeeMapper;

    public DashboardServiceImpl(EmployeeRepository employeeRepository,
                                DepartmentRepository departmentRepository,
                                EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.employeeMapper = employeeMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        long totalEmployees = employeeRepository.count();
        long activeEmployees = employeeRepository.countByEmploymentStatus(EmploymentStatus.ACTIVE);
        long departmentsCount = departmentRepository.count();
        // Recently joined: joined in the last 90 days
        LocalDate ninetyDaysAgo = LocalDate.now().minusDays(90);
        long recentlyJoinedEmployees = employeeRepository.countByJoiningDateGreaterThanEqual(ninetyDaysAgo);

        return new DashboardStatsResponse(
                totalEmployees,
                activeEmployees,
                departmentsCount,
                recentlyJoinedEmployees
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDistributionDto> getDepartmentDistribution() {
        List<Object[]> results = employeeRepository.getDepartmentEmployeeCounts();
        long totalEmployees = employeeRepository.count();

        List<DepartmentDistributionDto> distribution = new ArrayList<>();
        for (Object[] row : results) {
            Long deptId = (Long) row[0];
            String deptName = (String) row[1];
            Long count = (Long) row[2];

            double percentage = 0.0;
            if (totalEmployees > 0 && count > 0) {
                percentage = BigDecimal.valueOf((count * 100.0) / totalEmployees)
                        .setScale(1, RoundingMode.HALF_UP)
                        .doubleValue();
            }

            distribution.add(new DepartmentDistributionDto(deptId, deptName, count, percentage));
        }

        return distribution;
    }

    @Override
    @Transactional(readOnly = true)
    public List<JoiningTrendDto> getJoiningTrends() {
        List<LocalDate> joiningDates = employeeRepository.findAllJoiningDates();

        // Count per YearMonth
        Map<YearMonth, Long> countsByMonth = new HashMap<>();
        for (LocalDate date : joiningDates) {
            YearMonth ym = YearMonth.from(date);
            countsByMonth.put(ym, countsByMonth.getOrDefault(ym, 0L) + 1L);
        }

        // Build continuous timeline for the last 6 months (up to current month)
        YearMonth currentYm = YearMonth.now();
        List<JoiningTrendDto> trends = new ArrayList<>();
        DateTimeFormatter monthNameFormatter = DateTimeFormatter.ofPattern("MMM yyyy");

        // If we have dates further in history, start from either earliest or last 6 months
        YearMonth startYm = currentYm.minusMonths(5);
        if (!countsByMonth.isEmpty()) {
            YearMonth minDataYm = countsByMonth.keySet().stream().min(YearMonth::compareTo).orElse(startYm);
            if (minDataYm.isBefore(startYm)) {
                // If data spans up to 12 months, include up to 12
                startYm = currentYm.minusMonths(11);
                if (minDataYm.isAfter(startYm)) {
                    startYm = minDataYm;
                }
            }
        }

        YearMonth cursor = startYm;
        while (!cursor.isAfter(currentYm)) {
            long count = countsByMonth.getOrDefault(cursor, 0L);
            trends.add(new JoiningTrendDto(cursor.format(monthNameFormatter), cursor.getYear(), count));
            cursor = cursor.plusMonths(1);
        }

        return trends;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getRecentEmployees() {
        List<Employee> recent = employeeRepository.findTop5ByOrderByJoiningDateDescIdDesc();
        return recent.stream()
                .map(employeeMapper::toResponse)
                .toList();
    }
}
