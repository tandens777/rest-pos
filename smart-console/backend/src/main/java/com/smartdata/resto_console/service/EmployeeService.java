package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.EmployeeRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import com.smartdata.resto_console.model.Employee;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void addEmployee(
        String emp_no, String last_nm, String first_nm, String gender, Integer station_id,
        String tin_no, String sss_no, LocalDate bday, String phone_no, LocalDate date_hired,
        LocalDate date_end, String remarks, String face_id, String public_key, String console_flag,
        String drawer_flag, String active_flag, String pic_filename, 

        String address, String email, Integer emp_type_id, Integer emp_status_id, 
        String password, String username, Long role_id, 

        String mon_restday, LocalTime mon_start1, LocalTime mon_end1,
        LocalTime mon_start2, LocalTime mon_end2, 
        LocalTime mon_start3, LocalTime mon_end3,
        String tue_restday, LocalTime tue_start1, LocalTime tue_end1, 
        LocalTime tue_start2, LocalTime tue_end2,
        LocalTime tue_start3, LocalTime tue_end3, 
        String wed_restday, LocalTime wed_start1, LocalTime wed_end1,
        LocalTime wed_start2, LocalTime wed_end2, 
        LocalTime wed_start3, LocalTime wed_end3,
        String thu_restday, LocalTime thu_start1, LocalTime thu_end1, 
        LocalTime thu_start2, LocalTime thu_end2,
        LocalTime thu_start3, LocalTime thu_end3, 
        String fri_restday, LocalTime fri_start1, LocalTime fri_end1,
        LocalTime fri_start2, LocalTime fri_end2, 
        LocalTime fri_start3, LocalTime fri_end3,
        String sat_restday, LocalTime sat_start1, LocalTime sat_end1, 
        LocalTime sat_start2, LocalTime sat_end2,
        LocalTime sat_start3, LocalTime sat_end3, 
        String sun_restday, LocalTime sun_start1, LocalTime sun_end1,
        LocalTime sun_start2, LocalTime sun_end2, 
        LocalTime sun_start3, LocalTime sun_end3
    ) {
        employeeRepository.insertEmployee(
            emp_no, last_nm, first_nm, gender, station_id, tin_no, sss_no, bday, phone_no,
            date_hired, date_end, remarks, face_id, public_key, console_flag, drawer_flag,
            active_flag, pic_filename, 
            address, email, emp_type_id, emp_status_id, password, username, role_id,
            mon_restday, mon_start1, mon_end1, mon_start2, mon_end2, mon_start3, mon_end3, 
            tue_restday, tue_start1, tue_end1, tue_start2, tue_end2, tue_start3, tue_end3, 
            wed_restday, wed_start1, wed_end1, wed_start2, wed_end2, wed_start3, wed_end3, 
            thu_restday, thu_start1, thu_end1, thu_start2, thu_end2, thu_start3, thu_end3, 
            fri_restday, fri_start1, fri_end1, fri_start2, fri_end2, fri_start3, fri_end3, 
            sat_restday, sat_start1, sat_end1, sat_start2, sat_end2, sat_start3, sat_end3, 
            sun_restday, sun_start1, sun_end1, sun_start2, sun_end2, sun_start3, sun_end3
        );
    }

    @Transactional
    public void updateEmployee(
        Long id, String emp_no, String last_nm, String first_nm, String gender, Integer station_id,
        String tin_no, String sss_no, LocalDate bday, String phone_no, LocalDate date_hired,
        LocalDate date_end, String remarks, String face_id, String public_key, String console_flag,
        String drawer_flag, String active_flag, String pic_filename, 
        
        String address, String email, Integer emp_type_id, Integer emp_status_id, 
        String password, String username, Long role_id, 

        String mon_restday, LocalTime mon_start1, LocalTime mon_end1,
        LocalTime mon_start2, LocalTime mon_end2, 
        LocalTime mon_start3, LocalTime mon_end3,
        String tue_restday, LocalTime tue_start1, LocalTime tue_end1, 
        LocalTime tue_start2, LocalTime tue_end2,
        LocalTime tue_start3, LocalTime tue_end3, 
        String wed_restday, LocalTime wed_start1, LocalTime wed_end1,
        LocalTime wed_start2, LocalTime wed_end2, 
        LocalTime wed_start3, LocalTime wed_end3,
        String thu_restday, LocalTime thu_start1, LocalTime thu_end1, 
        LocalTime thu_start2, LocalTime thu_end2,
        LocalTime thu_start3, LocalTime thu_end3, 
        String fri_restday, LocalTime fri_start1, LocalTime fri_end1,
        LocalTime fri_start2, LocalTime fri_end2, 
        LocalTime fri_start3, LocalTime fri_end3,
        String sat_restday, LocalTime sat_start1, LocalTime sat_end1, 
        LocalTime sat_start2, LocalTime sat_end2,
        LocalTime sat_start3, LocalTime sat_end3, 
        String sun_restday, LocalTime sun_start1, LocalTime sun_end1,
        LocalTime sun_start2, LocalTime sun_end2, 
        LocalTime sun_start3, LocalTime sun_end3
    ) {
        employeeRepository.updateEmployee(
            id, emp_no, last_nm, first_nm, gender, station_id, tin_no, sss_no, bday, phone_no,
            date_hired, date_end, remarks, face_id, public_key, console_flag, drawer_flag,
            active_flag, pic_filename, 
            address, email, emp_type_id, emp_status_id, password, username, role_id,
            mon_restday, mon_start1, mon_end1, mon_start2, mon_end2, mon_start3, mon_end3, 
            tue_restday, tue_start1, tue_end1, tue_start2, tue_end2, tue_start3, tue_end3, 
            wed_restday, wed_start1, wed_end1, wed_start2, wed_end2, wed_start3, wed_end3, 
            thu_restday, thu_start1, thu_end1, thu_start2, thu_end2, thu_start3, thu_end3, 
            fri_restday, fri_start1, fri_end1, fri_start2, fri_end2, fri_start3, fri_end3, 
            sat_restday, sat_start1, sat_end1, sat_start2, sat_end2, sat_start3, sat_end3, 
            sun_restday, sun_start1, sun_end1, sun_start2, sun_end2, sun_start3, sun_end3
        );
    }

    @Transactional
    public void deleteEmployee(Long id) {
        employeeRepository.deleteEmployee(id);
    }

    public Optional<Employee> getEmployee(Long id) throws GenericNotFoundException {
        Optional<Employee> employee = employeeRepository.findById(id);

        if (employee.isPresent()) {
            return employee;
        } else {
            throw new GenericNotFoundException("Employee not found with id: " + id);
        }
    }

    public List<Employee> getEmployees(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            // If searchTerm is empty, return all employees ordered by ID
            return employeeRepository.findAllByOrderById();
        }

        // Split the searchTerm into individual words
        String[] searchWords = searchTerm.trim().split("\\s+");

        // Create a stream of employees and filter based on the search words
        return employeeRepository.findAllByOrderById().stream()
                .filter(employee -> matchesSearchTerm(employee, searchWords))
                .collect(Collectors.toList());
    }

    private boolean matchesSearchTerm(Employee employee, String[] searchWords) {
        // Check if any of the search words match the firstNm or lastNm (case-insensitive)
        for (String word : searchWords) {
            if (employee.getFirstNm().toLowerCase().contains(word.toLowerCase()) ||
                employee.getLastNm().toLowerCase().contains(word.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}