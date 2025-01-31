package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.EmployeeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public void addEmployee(
        @RequestParam String emp_no, @RequestParam String last_nm, @RequestParam String first_nm,
        @RequestParam String gender, @RequestParam(required = false) Integer station_id, @RequestParam(required = false) String tin_no,
        @RequestParam(required = false) String sss_no, @RequestParam(required = false) LocalDate bday, @RequestParam(required = false) String phone_no,
        @RequestParam(required = false) LocalDate date_hired, @RequestParam(required = false) LocalDate date_end, @RequestParam(required = false) String remarks,
        @RequestParam(required = false) String face_id, @RequestParam(required = false) String public_key, @RequestParam String console_flag,
        @RequestParam String drawer_flag, @RequestParam String active_flag, @RequestParam(required = false) String pic_filename, 
        @RequestParam(required = false) String address, @RequestParam(required = false) String email,         
        @RequestParam Integer emp_type_id, @RequestParam Integer emp_status_id, 

        @RequestParam String password, @RequestParam String username, @RequestParam Long role_id, 
        
        @RequestParam String mon_restday, @RequestParam(required = false) LocalTime mon_start1, @RequestParam(required = false) LocalTime mon_end1, 
        @RequestParam(required = false) LocalTime mon_start2, @RequestParam(required = false) LocalTime mon_end2,
        @RequestParam(required = false) LocalTime mon_start3, @RequestParam(required = false) LocalTime mon_end3, 
        @RequestParam String tue_restday, @RequestParam(required = false) LocalTime tue_start1, @RequestParam(required = false) LocalTime tue_end1, 
        @RequestParam(required = false) LocalTime tue_start2, @RequestParam(required = false) LocalTime tue_end2,
        @RequestParam(required = false) LocalTime tue_start3, @RequestParam(required = false) LocalTime tue_end3, 
        @RequestParam String wed_restday, @RequestParam(required = false) LocalTime wed_start1, @RequestParam(required = false) LocalTime wed_end1, 
        @RequestParam(required = false) LocalTime wed_start2, @RequestParam(required = false) LocalTime wed_end2,
        @RequestParam(required = false) LocalTime wed_start3, @RequestParam(required = false) LocalTime wed_end3, 
        @RequestParam String thu_restday, @RequestParam(required = false) LocalTime thu_start1, @RequestParam(required = false) LocalTime thu_end1, 
        @RequestParam(required = false) LocalTime thu_start2, @RequestParam(required = false) LocalTime thu_end2,
        @RequestParam(required = false) LocalTime thu_start3, @RequestParam(required = false) LocalTime thu_end3, 
        @RequestParam String fri_restday, @RequestParam(required = false) LocalTime fri_start1, @RequestParam(required = false) LocalTime fri_end1, 
        @RequestParam(required = false) LocalTime fri_start2, @RequestParam(required = false) LocalTime fri_end2,
        @RequestParam(required = false) LocalTime fri_start3, @RequestParam(required = false) LocalTime fri_end3, 
        @RequestParam String sat_restday, @RequestParam(required = false) LocalTime sat_start1, @RequestParam(required = false) LocalTime sat_end1, 
        @RequestParam(required = false) LocalTime sat_start2, @RequestParam(required = false) LocalTime sat_end2,
        @RequestParam(required = false) LocalTime sat_start3, @RequestParam(required = false) LocalTime sat_end3, 
        @RequestParam String sun_restday, @RequestParam(required = false) LocalTime sun_start1, @RequestParam(required = false) LocalTime sun_end1, 
        @RequestParam(required = false) LocalTime sun_start2, @RequestParam(required = false) LocalTime sun_end2,
        @RequestParam(required = false) LocalTime sun_start3, @RequestParam(required = false) LocalTime sun_end3
    ) {
        employeeService.addEmployee(
            emp_no, last_nm, first_nm, gender, station_id, tin_no, sss_no, bday, phone_no, date_hired,
            date_end, remarks, face_id, public_key, console_flag, drawer_flag, active_flag, pic_filename, 
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

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateEmployee(
        @PathVariable Long id, @RequestParam String emp_no, @RequestParam String last_nm, @RequestParam String first_nm, 
        @RequestParam String gender, @RequestParam(required = false) Integer station_id, @RequestParam(required = false) String tin_no,
        @RequestParam(required = false) String sss_no, @RequestParam(required = false) LocalDate bday, @RequestParam(required = false) String phone_no,
        @RequestParam(required = false) LocalDate date_hired, @RequestParam(required = false) LocalDate date_end, @RequestParam(required = false) String remarks,
        @RequestParam(required = false) String face_id, @RequestParam(required = false) String public_key, @RequestParam String console_flag,
        @RequestParam String drawer_flag, @RequestParam String active_flag, @RequestParam(required = false) String pic_filename, 
        @RequestParam(required = false) String address, @RequestParam(required = false) String email,         
        @RequestParam Integer emp_type_id, @RequestParam Integer emp_status_id, 

        @RequestParam String password, @RequestParam String username, @RequestParam Long role_id, 
        
        @RequestParam String mon_restday, @RequestParam(required = false) LocalTime mon_start1, @RequestParam(required = false) LocalTime mon_end1, 
        @RequestParam(required = false) LocalTime mon_start2, @RequestParam(required = false) LocalTime mon_end2,
        @RequestParam(required = false) LocalTime mon_start3, @RequestParam(required = false) LocalTime mon_end3, 
        @RequestParam String tue_restday, @RequestParam(required = false) LocalTime tue_start1, @RequestParam(required = false) LocalTime tue_end1, 
        @RequestParam(required = false) LocalTime tue_start2, @RequestParam(required = false) LocalTime tue_end2,
        @RequestParam(required = false) LocalTime tue_start3, @RequestParam(required = false) LocalTime tue_end3, 
        @RequestParam String wed_restday, @RequestParam(required = false) LocalTime wed_start1, @RequestParam(required = false) LocalTime wed_end1, 
        @RequestParam(required = false) LocalTime wed_start2, @RequestParam(required = false) LocalTime wed_end2,
        @RequestParam(required = false) LocalTime wed_start3, @RequestParam(required = false) LocalTime wed_end3, 
        @RequestParam String thu_restday, @RequestParam(required = false) LocalTime thu_start1, @RequestParam(required = false) LocalTime thu_end1, 
        @RequestParam(required = false) LocalTime thu_start2, @RequestParam(required = false) LocalTime thu_end2,
        @RequestParam(required = false) LocalTime thu_start3, @RequestParam(required = false) LocalTime thu_end3, 
        @RequestParam String fri_restday, @RequestParam(required = false) LocalTime fri_start1, @RequestParam(required = false) LocalTime fri_end1, 
        @RequestParam(required = false) LocalTime fri_start2, @RequestParam(required = false) LocalTime fri_end2,
        @RequestParam(required = false) LocalTime fri_start3, @RequestParam(required = false) LocalTime fri_end3, 
        @RequestParam String sat_restday, @RequestParam(required = false) LocalTime sat_start1, @RequestParam(required = false) LocalTime sat_end1, 
        @RequestParam(required = false) LocalTime sat_start2, @RequestParam(required = false) LocalTime sat_end2,
        @RequestParam(required = false) LocalTime sat_start3, @RequestParam(required = false) LocalTime sat_end3, 
        @RequestParam String sun_restday, @RequestParam(required = false) LocalTime sun_start1, @RequestParam(required = false) LocalTime sun_end1, 
        @RequestParam(required = false) LocalTime sun_start2, @RequestParam(required = false) LocalTime sun_end2,
        @RequestParam(required = false) LocalTime sun_start3, @RequestParam(required = false) LocalTime sun_end3
    ) {
        employeeService.updateEmployee(
            id, emp_no, last_nm, first_nm, gender, station_id, tin_no, sss_no, bday, phone_no, date_hired,
            date_end, remarks, face_id, public_key, console_flag, drawer_flag, active_flag, pic_filename, 
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

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<Employee>> getEmployee(@PathVariable Long id) throws GenericNotFoundException {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getEmployees(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(employeeService.getEmployees(search));
    }
}