package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.EmployeeService;
import com.smartdata.resto_console.dto.*;

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
    public void addEmployee(@RequestBody EmployeeDTO employeeDTO) {
        employeeService.addEmployee(
            employeeDTO.emp_no, employeeDTO.last_nm, employeeDTO.first_nm, employeeDTO.gender, 
            employeeDTO.station_id, employeeDTO.tin_no, employeeDTO.sss_no, employeeDTO.bday, 
            employeeDTO.phone_no, employeeDTO.date_hired, employeeDTO.date_end, employeeDTO.remarks, 
            employeeDTO.facial_features, employeeDTO.public_key, employeeDTO.console_flag, 
            employeeDTO.drawer_flag, employeeDTO.active_flag, employeeDTO.pic_filename, 
            employeeDTO.address, employeeDTO.email, employeeDTO.emp_type_id, employeeDTO.emp_status_id, 
            employeeDTO.password, employeeDTO.username, employeeDTO.role_id, 
            
            employeeDTO.mon_restday, employeeDTO.mon_start1, employeeDTO.mon_end1, 
            employeeDTO.mon_start2, employeeDTO.mon_end2, employeeDTO.mon_start3, employeeDTO.mon_end3,
            employeeDTO.tue_restday, employeeDTO.tue_start1, employeeDTO.tue_end1, 
            employeeDTO.tue_start2, employeeDTO.tue_end2, employeeDTO.tue_start3, employeeDTO.tue_end3,
            employeeDTO.wed_restday, employeeDTO.wed_start1, employeeDTO.wed_end1, 
            employeeDTO.wed_start2, employeeDTO.wed_end2, employeeDTO.wed_start3, employeeDTO.wed_end3,
            employeeDTO.thu_restday, employeeDTO.thu_start1, employeeDTO.thu_end1, 
            employeeDTO.thu_start2, employeeDTO.thu_end2, employeeDTO.thu_start3, employeeDTO.thu_end3,
            employeeDTO.fri_restday, employeeDTO.fri_start1, employeeDTO.fri_end1, 
            employeeDTO.fri_start2, employeeDTO.fri_end2, employeeDTO.fri_start3, employeeDTO.fri_end3,
            employeeDTO.sat_restday, employeeDTO.sat_start1, employeeDTO.sat_end1, 
            employeeDTO.sat_start2, employeeDTO.sat_end2, employeeDTO.sat_start3, employeeDTO.sat_end3,
            employeeDTO.sun_restday, employeeDTO.sun_start1, employeeDTO.sun_end1, 
            employeeDTO.sun_start2, employeeDTO.sun_end2, employeeDTO.sun_start3, employeeDTO.sun_end3
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateEmployee(
        @PathVariable Long id,
        @RequestBody EmployeeDTO employeeDTO // Receive the entire employee data as JSON
    ) {
        employeeService.updateEmployee(
            id, employeeDTO.emp_no, employeeDTO.last_nm, employeeDTO.first_nm, employeeDTO.gender, 
            employeeDTO.station_id, employeeDTO.tin_no, employeeDTO.sss_no, employeeDTO.bday, 
            employeeDTO.phone_no, employeeDTO.date_hired, employeeDTO.date_end, employeeDTO.remarks, 
            employeeDTO.facial_features, employeeDTO.public_key, employeeDTO.console_flag, 
            employeeDTO.drawer_flag, employeeDTO.active_flag, employeeDTO.pic_filename, 
            employeeDTO.address, employeeDTO.email, employeeDTO.emp_type_id, employeeDTO.emp_status_id, 
            employeeDTO.password, employeeDTO.username, employeeDTO.role_id, 
            
            employeeDTO.mon_restday, employeeDTO.mon_start1, employeeDTO.mon_end1, 
            employeeDTO.mon_start2, employeeDTO.mon_end2, employeeDTO.mon_start3, employeeDTO.mon_end3,
            employeeDTO.tue_restday, employeeDTO.tue_start1, employeeDTO.tue_end1, 
            employeeDTO.tue_start2, employeeDTO.tue_end2, employeeDTO.tue_start3, employeeDTO.tue_end3,
            employeeDTO.wed_restday, employeeDTO.wed_start1, employeeDTO.wed_end1, 
            employeeDTO.wed_start2, employeeDTO.wed_end2, employeeDTO.wed_start3, employeeDTO.wed_end3,
            employeeDTO.thu_restday, employeeDTO.thu_start1, employeeDTO.thu_end1, 
            employeeDTO.thu_start2, employeeDTO.thu_end2, employeeDTO.thu_start3, employeeDTO.thu_end3,
            employeeDTO.fri_restday, employeeDTO.fri_start1, employeeDTO.fri_end1, 
            employeeDTO.fri_start2, employeeDTO.fri_end2, employeeDTO.fri_start3, employeeDTO.fri_end3,
            employeeDTO.sat_restday, employeeDTO.sat_start1, employeeDTO.sat_end1, 
            employeeDTO.sat_start2, employeeDTO.sat_end2, employeeDTO.sat_start3, employeeDTO.sat_end3,
            employeeDTO.sun_restday, employeeDTO.sun_start1, employeeDTO.sun_end1, 
            employeeDTO.sun_start2, employeeDTO.sun_end2, employeeDTO.sun_start3, employeeDTO.sun_end3
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

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','MANAGER','WAITER','CASHIER','KITCHEN1','KITCHEN2','KITCHEN3','BAR')")
    @PutMapping("/change_pin")
    public void changePIN(
        @RequestParam(required = false) String username, 
        @RequestParam(required = false) String old_password, @RequestParam(required = false) String new_password
    ) throws GenericNotFoundException {
        employeeService.changePIN(
            username, old_password, new_password
        );
    }

}