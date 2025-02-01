package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.EmployeeStatusService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/employee_statuses")
public class EmployeeStatusController {

    @Autowired
    private EmployeeStatusService empStatusService;

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/all")
    public ResponseEntity<List<EmployeeStatus>> getEmployeeStatuses() throws GenericNotFoundException {
        return ResponseEntity.ok(empStatusService.getEmployeeStatuses());
    }    
}
