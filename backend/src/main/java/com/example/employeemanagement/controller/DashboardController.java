package com.example.employeemanagement.controller;

import com.example.employeemanagement.dto.DashboardStatsResponse;
import com.example.employeemanagement.dto.DepartmentDistributionDto;
import com.example.employeemanagement.dto.EmployeeResponse;
import com.example.employeemanagement.dto.JoiningTrendDto;
import com.example.employeemanagement.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats() {
        DashboardStatsResponse stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/department-distribution")
    public ResponseEntity<List<DepartmentDistributionDto>> getDepartmentDistribution() {
        List<DepartmentDistributionDto> distribution = dashboardService.getDepartmentDistribution();
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/joining-trends")
    public ResponseEntity<List<JoiningTrendDto>> getJoiningTrends() {
        List<JoiningTrendDto> trends = dashboardService.getJoiningTrends();
        return ResponseEntity.ok(trends);
    }

    @GetMapping("/recent-employees")
    public ResponseEntity<List<EmployeeResponse>> getRecentEmployees() {
        List<EmployeeResponse> recent = dashboardService.getRecentEmployees();
        return ResponseEntity.ok(recent);
    }
}
