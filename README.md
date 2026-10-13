# 🏢 PeopleDesk — Full Stack Employee Management System

> A production-grade **Full Stack Java** Employee Management System built with **React + Spring Boot + MySQL + Tailwind CSS + REST API**.

![Java](https://img.shields.io/badge/Java-21-orange?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen?logo=springboot)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?logo=tailwindcss)
![Maven](https://img.shields.io/badge/Maven-3.9-red?logo=apachemaven)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Database Schema](#-database-schema)
5. [Prerequisites](#-prerequisites)
6. [Getting Started](#-getting-started)
7. [REST API Documentation](#-rest-api-documentation)
   - [Dashboard APIs](#dashboard-apis)
   - [Employee APIs](#employee-apis)
   - [Department APIs](#department-apis)
8. [Error Handling](#-error-handling)
9. [Testing](#-testing)
10. [Postman Setup](#-postman-setup)
11. [Architecture](#-architecture)
12. [Features](#-features)

---

## 🌟 Project Overview

**PeopleDesk** is a complete, production-style HR dashboard for managing employees and departments. Built as a **full-stack Java project**, it demonstrates:

- Clean REST API design with Spring Boot 3
- JPA / Hibernate ORM with MySQL 8
- React 19 frontend consuming REST APIs via Axios
- Responsive UI with Tailwind CSS v4
- Layered backend architecture (Controller → Service → Repository → DB)
- Input validation, error handling, and proper HTTP status codes
- Automated testing with JUnit 5, Mockito, and Vitest

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 21 | Core language |
| Spring Boot | 3.3.4 | Application framework |
| Spring Web | 3.3.4 | REST API layer |
| Spring Data JPA | 3.3.4 | ORM / repository layer |
| Hibernate | 6.x | JPA implementation |
| Spring Validation | 3.3.4 | DTO validation (`@NotBlank`, `@Email`, etc.) |
| MySQL Connector/J | 8.0 | JDBC driver for MySQL |
| Lombok | 1.18.x | Boilerplate reduction |
| Maven | 3.9 | Build and dependency management |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| Vite | 8.x | Build tool and dev server |
| Tailwind CSS | v4 | Utility-first styling |
| React Router | v7 | Client-side routing |
| Axios | latest | HTTP client for REST calls |
| React Hook Form | latest | Form management and validation |
| Recharts | latest | Dashboard charts |
| Lucide React | latest | Icons |
| React Hot Toast | latest | Toast notifications |

### Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| MySQL | 8.0 | Relational database |
| HikariCP | built-in | Connection pooling |

### Testing
| Technology | Purpose |
|-----------|---------|
| JUnit 5 | Backend unit testing |
| Mockito | Mocking dependencies |
| Spring Boot Test | Controller slice tests |
| Vitest | Frontend unit testing |
| Testing Library | React component testing |

---

## 📁 Project Structure

```
peopledesk/
│
├── README.md
├── .gitignore
│
├── backend/                                          # Spring Boot Application
│   ├── pom.xml
│   ├── .env.example
│   └── src/
│       ├── main/
│       │   ├── java/com/example/employeemanagement/
│       │   │   ├── EmployeeManagementApplication.java   # Main class
│       │   │   │
│       │   │   ├── config/
│       │   │   │   ├── CorsConfig.java                  # CORS configuration
│       │   │   │   └── DataInitializer.java             # Seed data on startup
│       │   │   │
│       │   │   ├── controller/
│       │   │   │   ├── EmployeeController.java          # /api/employees
│       │   │   │   ├── DepartmentController.java        # /api/departments
│       │   │   │   └── DashboardController.java         # /api/dashboard
│       │   │   │
│       │   │   ├── dto/
│       │   │   │   ├── EmployeeRequest.java             # Create/Update payload
│       │   │   │   ├── EmployeeResponse.java            # API response
│       │   │   │   ├── DepartmentRequest.java
│       │   │   │   ├── DepartmentResponse.java
│       │   │   │   ├── DashboardStatsResponse.java
│       │   │   │   ├── DepartmentDistributionDto.java
│       │   │   │   ├── JoiningTrendDto.java
│       │   │   │   ├── PageResponse.java                # Generic paginated wrapper
│       │   │   │   └── ErrorResponse.java               # Error payload
│       │   │   │
│       │   │   ├── entity/
│       │   │   │   ├── Employee.java                    # JPA entity
│       │   │   │   ├── Department.java                  # JPA entity
│       │   │   │   └── EmploymentStatus.java            # Enum: ACTIVE, ON_LEAVE, INACTIVE
│       │   │   │
│       │   │   ├── exception/
│       │   │   │   ├── GlobalExceptionHandler.java      # @RestControllerAdvice
│       │   │   │   ├── ResourceNotFoundException.java   # 404
│       │   │   │   ├── DuplicateEmailException.java     # 409
│       │   │   │   ├── DepartmentNotEmptyException.java # 409
│       │   │   │   └── BadRequestException.java         # 400
│       │   │   │
│       │   │   ├── mapper/
│       │   │   │   ├── EmployeeMapper.java              # Entity ↔ DTO
│       │   │   │   └── DepartmentMapper.java
│       │   │   │
│       │   │   ├── repository/
│       │   │   │   ├── EmployeeRepository.java          # JpaRepository + JpaSpecificationExecutor
│       │   │   │   └── DepartmentRepository.java
│       │   │   │
│       │   │   └── service/
│       │   │       ├── EmployeeService.java             # Interface
│       │   │       ├── DepartmentService.java
│       │   │       ├── DashboardService.java
│       │   │       └── impl/
│       │   │           ├── EmployeeServiceImpl.java     # Business logic
│       │   │           ├── DepartmentServiceImpl.java
│       │   │           └── DashboardServiceImpl.java
│       │   │
│       │   └── resources/
│       │       └── application.properties              # MySQL config
│       │
│       └── test/
│           ├── java/com/example/employeemanagement/
│           │   ├── EmployeeServiceTests.java            # 9 unit tests
│           │   ├── DepartmentServiceTests.java          # 5 unit tests
│           │   └── EmployeeControllerTests.java         # 4 slice tests
│           └── resources/
│               └── application.properties              # H2 in-memory for tests
│
└── frontend/                                         # React Application
    ├── index.html
    ├── package.json
    ├── vite.config.js                                  # Proxy to :8085, Vitest config
    └── src/
        ├── App.jsx                                     # Router + routes
        ├── main.jsx
        ├── index.css                                   # Tailwind v4 import
        │
        ├── services/
        │   ├── api.js                                  # Axios base client
        │   ├── employeeService.js
        │   ├── departmentService.js
        │   └── dashboardService.js
        │
        ├── hooks/
        │   └── useDebounce.js                          # 350ms debounce
        │
        ├── utils/
        │   ├── formatters.js                           # INR currency, date, status
        │   └── avatarHelper.js                         # Initials + avatar colors
        │
        ├── components/
        │   ├── common/                                 # Reusable UI components
        │   │   ├── Button.jsx
        │   │   ├── Input.jsx
        │   │   ├── Select.jsx
        │   │   ├── Modal.jsx
        │   │   ├── ConfirmationDialog.jsx
        │   │   ├── Pagination.jsx
        │   │   ├── LoadingSkeleton.jsx
        │   │   ├── EmptyState.jsx
        │   │   ├── ErrorState.jsx
        │   │   └── StatusBadge.jsx
        │   │
        │   ├── layout/
        │   │   ├── AppLayout.jsx
        │   │   ├── Sidebar.jsx                         # Collapsible, mobile drawer
        │   │   └── TopNavbar.jsx
        │   │
        │   ├── dashboard/
        │   │   ├── StatCard.jsx
        │   │   ├── DepartmentDistributionChart.jsx     # Recharts PieChart
        │   │   ├── JoiningTrendsChart.jsx              # Recharts AreaChart
        │   │   └── RecentEmployeesList.jsx
        │   │
        │   ├── employees/
        │   │   ├── EmployeeFilterBar.jsx
        │   │   ├── EmployeeTable.jsx
        │   │   ├── EmployeeDetailModal.jsx
        │   │   └── EmployeeForm.jsx                    # React Hook Form
        │   │
        │   └── departments/
        │       ├── DepartmentCard.jsx
        │       └── DepartmentModal.jsx
        │
        ├── pages/
        │   ├── DashboardPage.jsx
        │   ├── EmployeesPage.jsx
        │   ├── AddEmployeePage.jsx
        │   ├── EditEmployeePage.jsx
        │   ├── DepartmentsPage.jsx
        │   ├── SettingsPage.jsx
        │   └── NotFoundPage.jsx
        │
        └── test/
            ├── setup.js
            ├── EmployeeTable.test.jsx                  # 4 tests
            ├── EmployeeForm.test.jsx                   # 3 tests
            └── ConfirmationDialog.test.jsx             # 3 tests
```

---

## 🗄️ Database Schema

### Database: `employee_management` (MySQL 8.0)

#### `departments` table
```sql
CREATE TABLE departments (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL UNIQUE,
    description     TEXT,
    department_head VARCHAR(100),
    created_at      DATETIME(6) NOT NULL,
    updated_at      DATETIME(6) NOT NULL
);
```

#### `employees` table
```sql
CREATE TABLE employees (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name          VARCHAR(50)    NOT NULL,
    last_name           VARCHAR(50)    NOT NULL,
    email               VARCHAR(150)   NOT NULL UNIQUE,
    phone               VARCHAR(20),
    department_id       BIGINT         NOT NULL,
    job_title           VARCHAR(100)   NOT NULL,
    salary              DECIMAL(12,2)  NOT NULL,
    joining_date        DATE           NOT NULL,
    employment_status   VARCHAR(20)    NOT NULL DEFAULT 'ACTIVE',
    address             TEXT,
    profile_image_url   TEXT,
    created_at          DATETIME(6)    NOT NULL,
    updated_at          DATETIME(6)    NOT NULL,
    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

#### Entity Relationship
```
departments (1) ──────── (*) employees
    id  ◄──────────── department_id (FK)
```

---

## ✅ Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Java JDK | 21+ | `java -version` |
| Apache Maven | 3.9+ | `mvn -version` |
| Node.js | 18+ | `node -version` |
| npm | 9+ | `npm -version` |
| MySQL | 8.0+ | `mysql --version` |

---

## 🚀 Getting Started

### Step 1 — Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/peopledesk-employee-management.git
cd peopledesk-employee-management
```

### Step 2 — Create MySQL Database
```sql
-- Connect to MySQL
mysql -u root -p

-- Create the database
CREATE DATABASE employee_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 3 — Configure Backend
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_management?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
server.port=8085
```

### Step 4 — Start the Backend
```bash
cd backend
mvn spring-boot:run
```
> ✅ Spring Boot starts on `http://localhost:8085`
> ✅ Hibernate creates all tables automatically (`ddl-auto=update`)
> ✅ `DataInitializer` seeds 6 departments and 13 employees on first run

### Step 5 — Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
> ✅ Vite dev server starts on `http://localhost:5173`
> ✅ All `/api/*` calls are proxied to `http://localhost:8085`

### Step 6 — Open the app
```
http://localhost:5173
```

---

## 📡 REST API Documentation

> **Base URL:** `http://localhost:8085/api`
> **Content-Type:** `application/json`
> **Response Format:** JSON

---

### Dashboard APIs

#### GET `/api/dashboard/stats`
Returns summary KPI metrics for the dashboard.

**Request:**
```
GET http://localhost:8085/api/dashboard/stats
```

**Response `200 OK`:**
```json
{
  "totalEmployees": 13,
  "activeEmployees": 11,
  "departmentsCount": 6,
  "recentlyJoinedEmployees": 7
}
```

---

#### GET `/api/dashboard/department-distribution`
Returns employee count and percentage per department for pie chart.

**Request:**
```
GET http://localhost:8085/api/dashboard/department-distribution
```

**Response `200 OK`:**
```json
[
  {
    "departmentId": 1,
    "departmentName": "Engineering",
    "employeeCount": 4,
    "percentage": 30.8
  },
  {
    "departmentId": 4,
    "departmentName": "Finance",
    "employeeCount": 2,
    "percentage": 15.4
  },
  {
    "departmentId": 3,
    "departmentName": "Human Resources",
    "employeeCount": 2,
    "percentage": 15.4
  },
  {
    "departmentId": 2,
    "departmentName": "Product & Design",
    "employeeCount": 2,
    "percentage": 15.4
  },
  {
    "departmentId": 6,
    "departmentName": "Sales",
    "employeeCount": 2,
    "percentage": 15.4
  },
  {
    "departmentId": 5,
    "departmentName": "Marketing",
    "employeeCount": 1,
    "percentage": 7.7
  }
]
```

---

#### GET `/api/dashboard/joining-trends`
Returns employee joining count grouped by month for area chart.

**Request:**
```
GET http://localhost:8085/api/dashboard/joining-trends
```

**Response `200 OK`:**
```json
[
  { "month": "Apr 2026", "year": 2026, "count": 1 },
  { "month": "May 2026", "year": 2026, "count": 2 },
  { "month": "Jun 2026", "year": 2026, "count": 2 },
  { "month": "Jul 2026", "year": 2026, "count": 2 },
  { "month": "Aug 2026", "year": 2026, "count": 2 },
  { "month": "Sept 2026", "year": 2026, "count": 3 },
  { "month": "Oct 2026", "year": 2026, "count": 1 }
]
```

---

#### GET `/api/dashboard/recent-employees`
Returns the 5 most recently joined employees.

**Request:**
```
GET http://localhost:8085/api/dashboard/recent-employees
```

**Response `200 OK`:**
```json
[
  {
    "id": 15,
    "firstName": "Nilesh",
    "lastName": "Rathod",
    "fullName": "Nilesh Rathod",
    "email": "rathodnilesh714@gmail.com",
    "departmentName": "Engineering",
    "jobTitle": "Developer",
    "joiningDate": "2026-10-13",
    "employmentStatus": "ACTIVE"
  }
]
```

---

### Employee APIs

#### GET `/api/employees`
Returns paginated, filtered, sorted list of employees.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 0 | Page number (0-indexed) |
| `size` | int | 10 | Page size |
| `sortBy` | String | `firstName` | Sort field: `firstName`, `salary`, `joiningDate`, `email` |
| `direction` | String | `asc` | Sort direction: `asc` or `desc` |
| `search` | String | — | Search in name, email, ID |
| `departmentId` | Long | — | Filter by department ID |
| `status` | String | — | Filter by status: `ACTIVE`, `ON_LEAVE`, `INACTIVE` |

**Example Requests:**
```
GET /api/employees
GET /api/employees?page=0&size=5
GET /api/employees?search=priya
GET /api/employees?departmentId=1
GET /api/employees?status=ACTIVE
GET /api/employees?page=0&size=10&sortBy=salary&direction=desc
GET /api/employees?search=nilesh&departmentId=1&status=ACTIVE
```

**Response `200 OK`:**
```json
{
  "content": [
    {
      "id": 1,
      "firstName": "Aarav",
      "lastName": "Deshmukh",
      "fullName": "Aarav Deshmukh",
      "email": "aarav.deshmukh@peopledesk.io",
      "phone": "+91 98201 12345",
      "departmentId": 1,
      "departmentName": "Engineering",
      "jobTitle": "Senior Software Engineer",
      "salary": 145000.00,
      "joiningDate": "2026-05-12",
      "employmentStatus": "ACTIVE",
      "address": "402, High Street, Bandra West, Mumbai, Maharashtra",
      "profileImageUrl": "https://images.unsplash.com/photo-...",
      "createdAt": "2026-10-13T19:08:12.084501",
      "updatedAt": "2026-10-13T19:08:12.084501"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 13,
  "totalPages": 2,
  "hasNext": true,
  "hasPrevious": false,
  "first": true,
  "last": false
}
```

---

#### GET `/api/employees/{id}`
Returns a single employee by ID.

**Request:**
```
GET http://localhost:8085/api/employees/1
```

**Response `200 OK`:**
```json
{
  "id": 1,
  "firstName": "Aarav",
  "lastName": "Deshmukh",
  "fullName": "Aarav Deshmukh",
  "email": "aarav.deshmukh@peopledesk.io",
  "phone": "+91 98201 12345",
  "departmentId": 1,
  "departmentName": "Engineering",
  "jobTitle": "Senior Software Engineer",
  "salary": 145000.00,
  "joiningDate": "2026-05-12",
  "employmentStatus": "ACTIVE",
  "address": "402, High Street, Bandra West, Mumbai, Maharashtra",
  "profileImageUrl": "https://images.unsplash.com/photo-...",
  "createdAt": "2026-10-13T19:08:12.084501",
  "updatedAt": "2026-10-13T19:08:12.084501"
}
```

**Response `404 Not Found`:**
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found with id: 99",
  "timestamp": "2026-10-13T19:08:12"
}
```

---

#### POST `/api/employees`
Creates a new employee.

**Request:**
```
POST http://localhost:8085/api/employees
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Ravi",
  "lastName": "Sharma",
  "email": "ravi.sharma@company.com",
  "phone": "+91 98765 43210",
  "departmentId": 1,
  "jobTitle": "Software Engineer",
  "salary": 85000,
  "joiningDate": "2026-10-13",
  "employmentStatus": "ACTIVE",
  "address": "Pune, Maharashtra",
  "profileImageUrl": "https://example.com/avatar.jpg"
}
```

**Validation Rules:**
| Field | Rule |
|-------|------|
| `firstName` | Required, not blank |
| `lastName` | Required, not blank |
| `email` | Required, valid email format, unique |
| `departmentId` | Required, must exist |
| `jobTitle` | Required, not blank |
| `salary` | Required, positive number |
| `joiningDate` | Required, valid date |
| `employmentStatus` | Required: `ACTIVE`, `ON_LEAVE`, or `INACTIVE` |

**Response `201 Created`:**
```json
{
  "id": 16,
  "firstName": "Ravi",
  "lastName": "Sharma",
  "fullName": "Ravi Sharma",
  "email": "ravi.sharma@company.com",
  "departmentId": 1,
  "departmentName": "Engineering",
  "jobTitle": "Software Engineer",
  "salary": 85000.00,
  "joiningDate": "2026-10-13",
  "employmentStatus": "ACTIVE",
  "createdAt": "2026-10-13T19:15:00",
  "updatedAt": "2026-10-13T19:15:00"
}
```

**Response `409 Conflict` (duplicate email):**
```json
{
  "status": 409,
  "error": "Conflict",
  "message": "Employee with email 'ravi.sharma@company.com' already exists",
  "timestamp": "2026-10-13T19:15:00"
}
```

**Response `400 Bad Request` (validation failure):**
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": {
    "email": "must be a well-formed email address",
    "firstName": "must not be blank",
    "salary": "must be greater than 0"
  },
  "timestamp": "2026-10-13T19:15:00"
}
```

---

#### PUT `/api/employees/{id}`
Updates an existing employee.

**Request:**
```
PUT http://localhost:8085/api/employees/16
Content-Type: application/json
```

**Request Body:** *(same structure as POST)*
```json
{
  "firstName": "Ravi",
  "lastName": "Sharma",
  "email": "ravi.sharma@company.com",
  "phone": "+91 98765 43210",
  "departmentId": 2,
  "jobTitle": "Senior Software Engineer",
  "salary": 110000,
  "joiningDate": "2026-10-13",
  "employmentStatus": "ACTIVE"
}
```

**Response `200 OK`:** *(updated EmployeeResponse)*

**Response `404 Not Found`:** *(if ID doesn't exist)*

---

#### DELETE `/api/employees/{id}`
Deletes an employee permanently.

**Request:**
```
DELETE http://localhost:8085/api/employees/16
```

**Response `204 No Content`:** *(empty body on success)*

**Response `404 Not Found`:** *(if ID doesn't exist)*

---

### Department APIs

#### GET `/api/departments`
Returns all departments with employee count.

**Request:**
```
GET http://localhost:8085/api/departments
```

**Response `200 OK`:**
```json
[
  {
    "id": 1,
    "name": "Engineering",
    "description": "Software engineering, cloud infrastructure, and core systems",
    "departmentHead": "Priya Sharma",
    "employeeCount": 4,
    "createdAt": "2026-10-13T19:08:11.96694",
    "updatedAt": "2026-10-13T19:08:11.96694"
  },
  {
    "id": 2,
    "name": "Product & Design",
    "description": "Product management, UI/UX design, and user research",
    "departmentHead": "Rahul Verma",
    "employeeCount": 2,
    "createdAt": "2026-10-13T19:08:12.031129",
    "updatedAt": "2026-10-13T19:08:12.031129"
  }
]
```

---

#### GET `/api/departments/{id}`
Returns a single department by ID.

**Request:**
```
GET http://localhost:8085/api/departments/1
```

**Response `200 OK`:**
```json
{
  "id": 1,
  "name": "Engineering",
  "description": "Software engineering, cloud infrastructure, and core systems",
  "departmentHead": "Priya Sharma",
  "employeeCount": 4,
  "createdAt": "2026-10-13T19:08:11",
  "updatedAt": "2026-10-13T19:08:11"
}
```

---

#### POST `/api/departments`
Creates a new department.

**Request:**
```
POST http://localhost:8085/api/departments
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Legal",
  "description": "Legal compliance, contracts, and IP management",
  "departmentHead": "Suresh Nair"
}
```

**Validation Rules:**
| Field | Rule |
|-------|------|
| `name` | Required, unique |
| `description` | Optional |
| `departmentHead` | Optional |

**Response `201 Created`:**
```json
{
  "id": 7,
  "name": "Legal",
  "description": "Legal compliance, contracts, and IP management",
  "departmentHead": "Suresh Nair",
  "employeeCount": 0,
  "createdAt": "2026-10-13T19:20:00",
  "updatedAt": "2026-10-13T19:20:00"
}
```

---

#### PUT `/api/departments/{id}`
Updates an existing department.

**Request:**
```
PUT http://localhost:8085/api/departments/7
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Legal & Compliance",
  "description": "Legal, regulatory, and compliance operations",
  "departmentHead": "Suresh Nair"
}
```

**Response `200 OK`:** *(updated DepartmentResponse)*

---

#### DELETE `/api/departments/{id}`
Deletes a department. **Blocked if the department has employees.**

**Request:**
```
DELETE http://localhost:8085/api/departments/7
```

**Response `204 No Content`:** *(empty body — success)*

**Response `409 Conflict` (department has employees):**
```json
{
  "status": 409,
  "error": "Conflict",
  "message": "Cannot delete department 'Engineering' because it has 4 employee(s). Please reassign them first.",
  "timestamp": "2026-10-13T19:20:00"
}
```

---

## ⚠️ Error Handling

All errors follow this standard response format:

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Human-readable description of the error",
  "timestamp": "2026-10-13T19:08:12"
}
```

| HTTP Status | Meaning | When |
|-------------|---------|------|
| `200 OK` | Success | GET, PUT |
| `201 Created` | Resource created | POST |
| `204 No Content` | Deleted | DELETE |
| `400 Bad Request` | Validation failed | Invalid request body |
| `404 Not Found` | Resource missing | Wrong ID |
| `409 Conflict` | Business rule violation | Duplicate email, occupied dept |
| `500 Internal Server Error` | Unexpected error | Server-side crash |

---

## 🧪 Testing

### Backend Tests (JUnit 5 + Mockito)
```bash
cd backend
mvn test
```

**18 tests across 3 test classes:**

| Class | Tests |
|-------|-------|
| `EmployeeServiceTests` | 9 — create, get, update, delete, duplicate email, not found |
| `DepartmentServiceTests` | 5 — create, duplicate name, delete occupied, delete success, not found |
| `EmployeeControllerTests` | 4 — list, create 201, invalid 400, not found 404 |

> Tests use H2 in-memory database in MySQL mode — no MySQL required for testing.

### Frontend Tests (Vitest + Testing Library)
```bash
cd frontend
npm test
```

**10 tests across 3 test files:**

| File | Tests |
|------|-------|
| `EmployeeTable.test.jsx` | 4 — render, view click, delete click, empty state |
| `EmployeeForm.test.jsx` | 3 — fields render, validation errors, valid submit |
| `ConfirmationDialog.test.jsx` | 3 — render, confirm click, cancel click |

---

## 📬 Postman Setup

### Quick Import
1. Open **Postman**
2. Click **Import** → **Raw Text**
3. Paste the collection below and click **Import**

### Environment Variables
Set these in a Postman environment:

| Variable | Value |
|----------|-------|
| `baseUrl` | `http://localhost:8085/api` |

### Postman Collection (JSON)

```json
{
  "info": {
    "name": "PeopleDesk API",
    "description": "Employee Management System REST API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [{ "key": "baseUrl", "value": "http://localhost:8085/api" }],
  "item": [
    {
      "name": "Dashboard",
      "item": [
        { "name": "Get Stats", "request": { "method": "GET", "url": "{{baseUrl}}/dashboard/stats" } },
        { "name": "Department Distribution", "request": { "method": "GET", "url": "{{baseUrl}}/dashboard/department-distribution" } },
        { "name": "Joining Trends", "request": { "method": "GET", "url": "{{baseUrl}}/dashboard/joining-trends" } },
        { "name": "Recent Employees", "request": { "method": "GET", "url": "{{baseUrl}}/dashboard/recent-employees" } }
      ]
    },
    {
      "name": "Employees",
      "item": [
        { "name": "List Employees", "request": { "method": "GET", "url": "{{baseUrl}}/employees?page=0&size=10" } },
        { "name": "Search Employees", "request": { "method": "GET", "url": "{{baseUrl}}/employees?search=priya" } },
        { "name": "Filter by Department", "request": { "method": "GET", "url": "{{baseUrl}}/employees?departmentId=1" } },
        { "name": "Filter by Status", "request": { "method": "GET", "url": "{{baseUrl}}/employees?status=ACTIVE" } },
        { "name": "Get Employee by ID", "request": { "method": "GET", "url": "{{baseUrl}}/employees/1" } },
        {
          "name": "Create Employee",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/employees",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"firstName\": \"Ravi\",\n  \"lastName\": \"Sharma\",\n  \"email\": \"ravi.sharma@company.com\",\n  \"phone\": \"+91 98765 43210\",\n  \"departmentId\": 1,\n  \"jobTitle\": \"Software Engineer\",\n  \"salary\": 85000,\n  \"joiningDate\": \"2026-10-13\",\n  \"employmentStatus\": \"ACTIVE\"\n}"
            }
          }
        },
        {
          "name": "Update Employee",
          "request": {
            "method": "PUT",
            "url": "{{baseUrl}}/employees/1",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"firstName\": \"Aarav\",\n  \"lastName\": \"Deshmukh\",\n  \"email\": \"aarav.deshmukh@peopledesk.io\",\n  \"phone\": \"+91 98201 12345\",\n  \"departmentId\": 1,\n  \"jobTitle\": \"Lead Software Engineer\",\n  \"salary\": 160000,\n  \"joiningDate\": \"2026-05-12\",\n  \"employmentStatus\": \"ACTIVE\"\n}"
            }
          }
        },
        { "name": "Delete Employee", "request": { "method": "DELETE", "url": "{{baseUrl}}/employees/1" } }
      ]
    },
    {
      "name": "Departments",
      "item": [
        { "name": "List Departments", "request": { "method": "GET", "url": "{{baseUrl}}/departments" } },
        { "name": "Get Department by ID", "request": { "method": "GET", "url": "{{baseUrl}}/departments/1" } },
        {
          "name": "Create Department",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/departments",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Legal\",\n  \"description\": \"Legal and compliance\",\n  \"departmentHead\": \"Suresh Nair\"\n}"
            }
          }
        },
        {
          "name": "Update Department",
          "request": {
            "method": "PUT",
            "url": "{{baseUrl}}/departments/1",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Engineering\",\n  \"description\": \"Updated description\",\n  \"departmentHead\": \"Priya Sharma\"\n}"
            }
          }
        },
        { "name": "Delete Department", "request": { "method": "DELETE", "url": "{{baseUrl}}/departments/1" } }
      ]
    }
  ]
}
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  React Frontend                      │
│   (Vite + Tailwind CSS + Recharts + React Router)   │
│                 http://localhost:5173                │
└────────────────────┬────────────────────────────────┘
                     │ Axios HTTP (proxied via Vite)
                     ▼
┌─────────────────────────────────────────────────────┐
│              Spring Boot Backend                     │
│                http://localhost:8085                 │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │Controller│→ │ Service  │→ │   Repository     │  │
│  │ REST API │  │ Business │  │ Spring Data JPA  │  │
│  │  Layer   │  │  Logic   │  │ + Hibernate ORM  │  │
│  └──────────┘  └──────────┘  └────────┬─────────┘  │
└───────────────────────────────────────┼─────────────┘
                                        │ JDBC
                                        ▼
                         ┌──────────────────────────┐
                         │      MySQL 8.0           │
                         │  employee_management DB  │
                         │  ┌────────────────────┐  │
                         │  │    departments     │  │
                         │  │    employees       │  │
                         │  └────────────────────┘  │
                         └──────────────────────────┘
```

---

## ✨ Features

| Feature | Details |
|---------|---------|
| Dashboard | KPI cards, pie chart, area chart, recent employees |
| Employee CRUD | Add, view, edit, delete with confirmation |
| Search | Debounced search across name, email, ID |
| Filtering | By department and employment status |
| Sorting | By name, salary, joining date (asc/desc) |
| Pagination | Backend-powered with configurable page size |
| Department CRUD | Add, edit, delete with employee count |
| Validation | Frontend (React Hook Form) + Backend (`@Valid`) |
| Error Handling | 400, 404, 409 with descriptive JSON errors |
| Notifications | Toast for every create/update/delete action |
| Responsive UI | Mobile drawer, tablet, desktop layouts |
| Testing | 18 backend + 10 frontend automated tests |

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👤 Author

**Nilesh Rathod**
- 📧 Email: [rathodnilesh7154@gmail.com](mailto:rathodnilesh7154@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/nilesh-rathod](https://linkedin.com/in/nilesh-rathod)
- 🐙 GitHub: [github.com/nilesh-rathod](https://github.com/nilesh-rathod)

---

> ⭐ If you found this project helpful, please give it a star on GitHub!
