package com.example.employeemanagement.dto;

public class DashboardStatsResponse {

    private long totalEmployees;
    private long activeEmployees;
    private long departmentsCount;
    private long recentlyJoinedEmployees;

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(long totalEmployees, long activeEmployees, long departmentsCount, long recentlyJoinedEmployees) {
        this.totalEmployees = totalEmployees;
        this.activeEmployees = activeEmployees;
        this.departmentsCount = departmentsCount;
        this.recentlyJoinedEmployees = recentlyJoinedEmployees;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getActiveEmployees() {
        return activeEmployees;
    }

    public void setActiveEmployees(long activeEmployees) {
        this.activeEmployees = activeEmployees;
    }

    public long getDepartmentsCount() {
        return departmentsCount;
    }

    public void setDepartmentsCount(long departmentsCount) {
        this.departmentsCount = departmentsCount;
    }

    public long getRecentlyJoinedEmployees() {
        return recentlyJoinedEmployees;
    }

    public void setRecentlyJoinedEmployees(long recentlyJoinedEmployees) {
        this.recentlyJoinedEmployees = recentlyJoinedEmployees;
    }
}
