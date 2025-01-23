package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.UnitService;

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
@RequestMapping("/api/company")
public class CompanyController {
/* 
    @Autowired
    private CompanyService cmpyService;

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateCompany(@PathVariable Integer id, @RequestParam String cmpy_nm, @RequestParam String operated_by, @RequestParam String tin_no, 
                            @RequestParam String address1, @RequestParam String address2, @RequestParam String roller_txt, @RequestParam String branch_manager, 
                            @RequestParam String branch_tel_no, @RequestParam String email, 
                            @RequestParam Integer table_count, @RequestParam Integer pickup_count, @RequestParam Integer dlvry_count, 
                            @RequestParam String send_to_kitchen, 
                            @RequestParam String track_invty_flag) {
        cmpyService.updateCompany(id, cmpy_nm, operated_by, tin_no, address1, address2, roller_txt, branch_manager, branch_tel_no, email, table_count, pickup_count, dlvry_count, send_to_kitchen, track_invty_flag);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<Company>> getCompany(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(cmpyService.getCompany(id));
    }
*/ 
}
