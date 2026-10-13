package com.example.employeemanagement.dto;

public class JoiningTrendDto {

    private String month;
    private int year;
    private long count;

    public JoiningTrendDto() {
    }

    public JoiningTrendDto(String month, int year, long count) {
        this.month = month;
        this.year = year;
        this.count = count;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
