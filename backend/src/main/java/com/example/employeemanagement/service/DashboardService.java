package com.example.employeemanagement.service;

import com.example.employeemanagement.dto.DashboardStatsResponse;
import com.example.employeemanagement.dto.DepartmentDistributionDto;
import com.example.employeemanagement.dto.EmployeeResponse;
import com.example.employeemanagement.dto.JoiningTrendDto;

import java.util.List;

public interface DashboardService {

    DashboardStatsResponse getDashboardStats();

    List<DepartmentDistributionDto> getDepartmentDistribution();

    List<JoiningTrendDto> getJoiningTrends();

    List<EmployeeResponse> getRecentEmployees();
}
