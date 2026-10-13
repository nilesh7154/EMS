# 🏢 PeopleDesk — Employee Management System

A full-stack, production-style **Employee Management System** built with **React + Spring Boot + PostgreSQL**.

![PeopleDesk Dashboard](https://img.shields.io/badge/Status-Live-brightgreen) ![Java](https://img.shields.io/badge/Java-21-orange) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-green) ![React](https://img.shields.io/badge/React-19-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)

---

## ✨ Features

- 📊 **Live Dashboard** — KPI stats, department distribution pie chart, joining trends chart
- 👥 **Employee CRUD** — Add, view, edit, delete employees with confirmation dialogs
- 🔍 **Search & Filter** — Search by name/email/ID, filter by department & status, sort by any column
- 📄 **Pagination** — Backend-powered pagination with configurable page size
- 🏢 **Department Management** — Full CRUD for departments with employee count
- 🔒 **Validation** — Duplicate email rejection, occupied department delete protection
- 🔔 **Toast Notifications** — Success & error feedback on every action
- 📱 **Fully Responsive** — Collapsible sidebar, mobile drawer, responsive tables and forms

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Forms | React Hook Form |
| Charts | Recharts |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Backend | Java 21, Spring Boot 3.3.4 |
| ORM | Spring Data JPA + Hibernate |
| Database | PostgreSQL 18 |
| Build | Maven 3.9 |
| Testing | JUnit 5, Mockito, Vitest, Testing Library |

---

## 📁 Project Structure

```
peopledesk/
├── backend/                        # Spring Boot application
│   ├── src/main/java/com/example/employeemanagement/
│   │   ├── config/                 # CORS, DataInitializer
│   │   ├── controller/             # REST controllers
│   │   ├── dto/                    # Request/Response DTOs
│   │   ├── entity/                 # JPA entities
│   │   ├── exception/              # Global exception handling
│   │   ├── mapper/                 # Entity ↔ DTO mappers
│   │   ├── repository/             # Spring Data JPA repositories
│   │   └── service/                # Business logic (interface + impl)
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── src/test/                   # JUnit 5 + Mockito tests
│   └── pom.xml
│
└── frontend/                       # React application
    ├── src/
    │   ├── components/
    │   │   ├── common/             # Button, Input, Modal, Pagination…
    │   │   ├── dashboard/          # StatCard, Charts, RecentEmployees
    │   │   ├── employees/          # Table, Form, FilterBar, DetailModal
    │   │   ├── departments/        # DepartmentCard, DepartmentModal
    │   │   └── layout/             # Sidebar, TopNavbar, AppLayout
    │   ├── hooks/                  # useDebounce
    │   ├── pages/                  # DashboardPage, EmployeesPage…
    │   ├── services/               # Axios API services
    │   └── utils/                  # Formatters, avatar helpers
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 18+
- PostgreSQL 15+

### 1. Database Setup

```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE employee_management;
```

### 2. Backend Setup

```bash
cd backend
```

Configure `src/main/resources/application.properties` (or set environment variables):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_management
spring.datasource.username=postgres
spring.datasource.password=your_password
server.port=8085
```

Run the backend:

```bash
mvn spring-boot:run
```

> ✅ Spring Boot starts on **http://localhost:8085**
> ✅ Hibernate auto-creates tables on first run
> ✅ `DataInitializer` seeds 6 departments and 13 employees automatically

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> ✅ Vite dev server starts on **http://localhost:5173**
> ✅ API calls are proxied to `http://localhost:8085`

---

## 🌐 API Endpoints

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | KPI summary |
| GET | `/api/dashboard/department-distribution` | Pie chart data |
| GET | `/api/dashboard/joining-trends` | Monthly trend data |
| GET | `/api/dashboard/recent-employees` | Last 5 joined |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List (paginated, filtered, sorted) |
| GET | `/api/employees/{id}` | Employee detail |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

**Query params:** `page`, `size`, `sortBy`, `direction`, `search`, `departmentId`, `status`

### Departments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/departments` | List all |
| GET | `/api/departments/{id}` | Department detail |
| POST | `/api/departments` | Create department |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete (blocked if has employees) |

---

## 🧪 Running Tests

### Backend (JUnit 5 + Mockito)
```bash
cd backend
mvn test
```
18 tests covering service layer and controller layer.

### Frontend (Vitest + Testing Library)
```bash
cd frontend
npm test
```
10 tests covering `EmployeeTable`, `EmployeeForm`, and `ConfirmationDialog`.

---

## ⚙️ Port Configuration

| Service | Default Port | Notes |
|---------|-------------|-------|
| Spring Boot | `8085` | Changed from 8080 to avoid Apache httpd conflict |
| Vite Dev Server | `5173` | Proxies `/api` to Spring Boot |
| PostgreSQL | `5432` | Standard port |

---

## 📸 Pages

| Page | Route |
|------|-------|
| Dashboard | `/` |
| Employees | `/employees` |
| Add Employee | `/employees/add` |
| Edit Employee | `/employees/:id/edit` |
| Departments | `/departments` |
| Settings | `/settings` |

---

## 👤 Author

**Nilesh Rathod** — [rathodnilesh7154@gmail.com](mailto:rathodnilesh7154@gmail.com)
