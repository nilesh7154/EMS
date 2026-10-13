package com.example.employeemanagement.dto;

public class DepartmentDistributionDto {

    private Long departmentId;
    private String departmentName;
    private Long employeeCount;
    private Double percentage;

    public DepartmentDistributionDto() {
    }

    public DepartmentDistributionDto(Long departmentId, String departmentName, Long employeeCount, Double percentage) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.employeeCount = employeeCount;
        this.percentage = percentage;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Long getEmployeeCount() {
        return employeeCount;
    }

    public void setEmployeeCount(Long employeeCount) {
        this.employeeCount = employeeCount;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }
}
