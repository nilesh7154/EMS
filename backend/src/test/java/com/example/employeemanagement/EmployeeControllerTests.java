package com.example.employeemanagement;

import com.example.employeemanagement.controller.EmployeeController;
import com.example.employeemanagement.dto.EmployeeRequest;
import com.example.employeemanagement.dto.EmployeeResponse;
import com.example.employeemanagement.dto.PageResponse;
import com.example.employeemanagement.entity.EmploymentStatus;
import com.example.employeemanagement.exception.GlobalExceptionHandler;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class EmployeeControllerTests {

    private MockMvc mockMvc;
    private EmployeeService employeeService;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        employeeService = mock(EmployeeService.class);
        EmployeeController employeeController = new EmployeeController(employeeService);
        mockMvc = MockMvcBuilders.standaloneSetup(employeeController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();

        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    @DisplayName("GET /api/employees should return 200 with page response")
    void testGetEmployees() throws Exception {
        EmployeeResponse employeeResponse = new EmployeeResponse(
                1L, "Aarav", "Deshmukh", "Aarav Deshmukh", "aarav@example.com", "+91 98201 12345",
                1L, "Engineering", "Senior Software Engineer", new BigDecimal("145000.00"),
                LocalDate.now(), EmploymentStatus.ACTIVE, "Address", null, LocalDateTime.now(), LocalDateTime.now()
        );

        PageResponse<EmployeeResponse> pageResponse = new PageResponse<>(
                List.of(employeeResponse), 0, 10, 1, 1, true, true, false, false
        );

        when(employeeService.getEmployees(eq(0), eq(10), eq("joiningDate"), eq("desc"), any(), any(), any()))
                .thenReturn(pageResponse);

        mockMvc.perform(get("/api/employees")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].firstName").value("Aarav"));
    }

    @Test
    @DisplayName("POST /api/employees with valid data should return 201 Created")
    void testCreateEmployee_Success() throws Exception {
        EmployeeRequest validRequest = new EmployeeRequest(
                "Jane", "Doe", "jane.doe@example.com", "+91 9876543210",
                1L, "QA Engineer", new BigDecimal("65000.00"),
                LocalDate.now(), EmploymentStatus.ACTIVE, "Address", null
        );

        EmployeeResponse createdResponse = new EmployeeResponse(
                1L, "Jane", "Doe", "Jane Doe", "jane.doe@example.com", "+91 9876543210",
                1L, "Engineering", "QA Engineer", new BigDecimal("65000.00"),
                LocalDate.now(), EmploymentStatus.ACTIVE, "Address", null, LocalDateTime.now(), LocalDateTime.now()
        );

        when(employeeService.createEmployee(any(EmployeeRequest.class))).thenReturn(createdResponse);

        mockMvc.perform(post("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("jane.doe@example.com"));
    }

    @Test
    @DisplayName("POST /api/employees with invalid data should return 400 Bad Request with field errors")
    void testCreateEmployee_InvalidData() throws Exception {
        EmployeeRequest invalidRequest = new EmployeeRequest(
                "", "", "invalid-email-format", "",
                null, "", new BigDecimal("-500.00"),
                null, null, null, null
        );

        mockMvc.perform(post("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.firstName").exists())
                .andExpect(jsonPath("$.validationErrors.email").exists())
                .andExpect(jsonPath("$.validationErrors.salary").exists());
    }

    @Test
    @DisplayName("GET /api/employees/{id} not found should return 404")
    void testGetEmployeeById_NotFound() throws Exception {
        when(employeeService.getEmployeeById(999L)).thenThrow(new ResourceNotFoundException("Employee not found with id: 999"));

        mockMvc.perform(get("/api/employees/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Employee not found with id: 999"));
    }
}
