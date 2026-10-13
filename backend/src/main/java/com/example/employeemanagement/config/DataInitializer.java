package com.example.employeemanagement.config;

import com.example.employeemanagement.entity.Department;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.entity.EmploymentStatus;
import com.example.employeemanagement.repository.DepartmentRepository;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public DataInitializer(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) {
        if (departmentRepository.count() > 0) {
            log.info("Database already contains departments. Skipping initial seed data.");
            return;
        }

        log.info("Seeding initial development departments and employees...");

        // 1. Departments
        Department engineering = new Department(null, "Engineering", "Software engineering, cloud infrastructure, and core systems", "Priya Sharma");
        Department product = new Department(null, "Product & Design", "Product management, UI/UX design, and user research", "Rahul Verma");
        Department hr = new Department(null, "Human Resources", "Talent acquisition, employee engagement, and workplace culture", "Ananya Roy");
        Department finance = new Department(null, "Finance", "Financial planning, accounting, tax, and payroll operations", "Amit Patel");
        Department marketing = new Department(null, "Marketing", "Brand marketing, performance campaigns, and PR", "Sneha Kulkarni");
        Department sales = new Department(null, "Sales", "Enterprise sales, customer success, and partner relations", "Vikram Malhotra");

        List<Department> savedDepartments = departmentRepository.saveAll(List.of(engineering, product, hr, finance, marketing, sales));
        Department deptEng = savedDepartments.get(0);
        Department deptProd = savedDepartments.get(1);
        Department deptHr = savedDepartments.get(2);
        Department deptFin = savedDepartments.get(3);
        Department deptMkt = savedDepartments.get(4);
        Department deptSales = savedDepartments.get(5);

        // 2. Employees (spanning varied months for rich trend charts)
        LocalDate today = LocalDate.now();

        Employee emp1 = new Employee();
        emp1.setFirstName("Aarav");
        emp1.setLastName("Deshmukh");
        emp1.setEmail("aarav.deshmukh@peopledesk.io");
        emp1.setPhone("+91 98201 12345");
        emp1.setDepartment(deptEng);
        emp1.setJobTitle("Senior Software Engineer");
        emp1.setSalary(new BigDecimal("145000.00"));
        emp1.setJoiningDate(today.minusMonths(5).withDayOfMonth(12));
        emp1.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp1.setAddress("402, High Street, Bandra West, Mumbai, Maharashtra");
        emp1.setProfileImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150");

        Employee emp2 = new Employee();
        emp2.setFirstName("Priya");
        emp2.setLastName("Sharma");
        emp2.setEmail("priya.sharma@peopledesk.io");
        emp2.setPhone("+91 98110 54321");
        emp2.setDepartment(deptEng);
        emp2.setJobTitle("Engineering Manager");
        emp2.setSalary(new BigDecimal("185000.00"));
        emp2.setJoiningDate(today.minusMonths(5).withDayOfMonth(20));
        emp2.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp2.setAddress("Green Glen Layout, Bellandur, Bengaluru, Karnataka");
        emp2.setProfileImageUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150");

        Employee emp3 = new Employee();
        emp3.setFirstName("Rohan");
        emp3.setLastName("Mehta");
        emp3.setEmail("rohan.mehta@peopledesk.io");
        emp3.setPhone("+91 97112 67890");
        emp3.setDepartment(deptProd);
        emp3.setJobTitle("Lead Product Designer");
        emp3.setSalary(new BigDecimal("120000.00"));
        emp3.setJoiningDate(today.minusMonths(4).withDayOfMonth(5));
        emp3.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp3.setAddress("Koramangala 4th Block, Bengaluru, Karnataka");
        emp3.setProfileImageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150");

        Employee emp4 = new Employee();
        emp4.setFirstName("Ananya");
        emp4.setLastName("Roy");
        emp4.setEmail("ananya.roy@peopledesk.io");
        emp4.setPhone("+91 98300 45678");
        emp4.setDepartment(deptHr);
        emp4.setJobTitle("Head of People Operations");
        emp4.setSalary(new BigDecimal("130000.00"));
        emp4.setJoiningDate(today.minusMonths(4).withDayOfMonth(18));
        emp4.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp4.setAddress("Salt Lake Sector V, Kolkata, West Bengal");
        emp4.setProfileImageUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150");

        Employee emp5 = new Employee();
        emp5.setFirstName("Amit");
        emp5.setLastName("Patel");
        emp5.setEmail("amit.patel@peopledesk.io");
        emp5.setPhone("+91 99250 89012");
        emp5.setDepartment(deptFin);
        emp5.setJobTitle("Senior Financial Analyst");
        emp5.setSalary(new BigDecimal("95000.00"));
        emp5.setJoiningDate(today.minusMonths(3).withDayOfMonth(10));
        emp5.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp5.setAddress("Bodakdev, SG Highway, Ahmedabad, Gujarat");
        emp5.setProfileImageUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150");

        Employee emp6 = new Employee();
        emp6.setFirstName("Sneha");
        emp6.setLastName("Kulkarni");
        emp6.setEmail("sneha.kulkarni@peopledesk.io");
        emp6.setPhone("+91 98220 33445");
        emp6.setDepartment(deptMkt);
        emp6.setJobTitle("Growth Marketing Specialist");
        emp6.setSalary(new BigDecimal("85000.00"));
        emp6.setJoiningDate(today.minusMonths(3).withDayOfMonth(25));
        emp6.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp6.setAddress("Kothrud, Pune, Maharashtra");
        emp6.setProfileImageUrl("https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150");

        Employee emp7 = new Employee();
        emp7.setFirstName("Vikram");
        emp7.setLastName("Malhotra");
        emp7.setEmail("vikram.malhotra@peopledesk.io");
        emp7.setPhone("+91 99101 22334");
        emp7.setDepartment(deptSales);
        emp7.setJobTitle("Account Executive");
        emp7.setSalary(new BigDecimal("90000.00"));
        emp7.setJoiningDate(today.minusMonths(2).withDayOfMonth(8));
        emp7.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp7.setAddress("Cyber City, DLF Phase 2, Gurugram, Haryana");
        emp7.setProfileImageUrl("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150");

        Employee emp8 = new Employee();
        emp8.setFirstName("Diya");
        emp8.setLastName("Nair");
        emp8.setEmail("diya.nair@peopledesk.io");
        emp8.setPhone("+91 98470 66778");
        emp8.setDepartment(deptEng);
        emp8.setJobTitle("Frontend Engineer");
        emp8.setSalary(new BigDecimal("75000.00"));
        emp8.setJoiningDate(today.minusMonths(2).withDayOfMonth(15));
        emp8.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp8.setAddress("Kakkanad, Kochi, Kerala");
        emp8.setProfileImageUrl("https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150");

        Employee emp9 = new Employee();
        emp9.setFirstName("Kabir");
        emp9.setLastName("Singh");
        emp9.setEmail("kabir.singh@peopledesk.io");
        emp9.setPhone("+91 98140 99887");
        emp9.setDepartment(deptEng);
        emp9.setJobTitle("DevOps & Cloud Engineer");
        emp9.setSalary(new BigDecimal("115000.00"));
        emp9.setJoiningDate(today.minusMonths(1).withDayOfMonth(2));
        emp9.setEmploymentStatus(EmploymentStatus.ON_LEAVE);
        emp9.setAddress("Sector 17, Chandigarh");
        emp9.setProfileImageUrl("https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150");

        Employee emp10 = new Employee();
        emp10.setFirstName("Meera");
        emp10.setLastName("Iyer");
        emp10.setEmail("meera.iyer@peopledesk.io");
        emp10.setPhone("+91 98400 11223");
        emp10.setDepartment(deptProd);
        emp10.setJobTitle("Associate Product Manager");
        emp10.setSalary(new BigDecimal("80000.00"));
        emp10.setJoiningDate(today.minusMonths(1).withDayOfMonth(14));
        emp10.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp10.setAddress("Adyar, Chennai, Tamil Nadu");
        emp10.setProfileImageUrl("https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150");

        Employee emp11 = new Employee();
        emp11.setFirstName("Kunal");
        emp11.setLastName("Verma");
        emp11.setEmail("kunal.verma@peopledesk.io");
        emp11.setPhone("+91 98765 43210");
        emp11.setDepartment(deptSales);
        emp11.setJobTitle("Business Development Specialist");
        emp11.setSalary(new BigDecimal("60000.00"));
        emp11.setJoiningDate(today.minusDays(15));
        emp11.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp11.setAddress("Banjara Hills, Hyderabad, Telangana");
        emp11.setProfileImageUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150");

        Employee emp12 = new Employee();
        emp12.setFirstName("Tanya");
        emp12.setLastName("Kapoor");
        emp12.setEmail("tanya.kapoor@peopledesk.io");
        emp12.setPhone("+91 99990 88776");
        emp12.setDepartment(deptHr);
        emp12.setJobTitle("Talent Acquisition Associate");
        emp12.setSalary(new BigDecimal("55000.00"));
        emp12.setJoiningDate(today.minusDays(5));
        emp12.setEmploymentStatus(EmploymentStatus.ACTIVE);
        emp12.setAddress("Vasant Kunj, New Delhi");
        emp12.setProfileImageUrl("https://images.unsplash.com/photo-1548142813-c348350df52b?w=150");

        Employee emp13 = new Employee();
        emp13.setFirstName("Arjun");
        emp13.setLastName("Bansal");
        emp13.setEmail("arjun.bansal@peopledesk.io");
        emp13.setPhone("+91 98290 77665");
        emp13.setDepartment(deptFin);
        emp13.setJobTitle("Accounts Executive");
        emp13.setSalary(new BigDecimal("48000.00"));
        emp13.setJoiningDate(today.minusMonths(6).withDayOfMonth(2));
        emp13.setEmploymentStatus(EmploymentStatus.INACTIVE);
        emp13.setAddress("C-Scheme, Jaipur, Rajasthan");
        emp13.setProfileImageUrl("");

        employeeRepository.saveAll(List.of(emp1, emp2, emp3, emp4, emp5, emp6, emp7, emp8, emp9, emp10, emp11, emp12, emp13));
        log.info("Successfully seeded {} departments and {} employees.", savedDepartments.size(), 13);
    }
}
