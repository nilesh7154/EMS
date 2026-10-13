package com.example.employeemanagement.exception;

public class DepartmentNotEmptyException extends RuntimeException {

    public DepartmentNotEmptyException(String message) {
        super(message);
    }
}
