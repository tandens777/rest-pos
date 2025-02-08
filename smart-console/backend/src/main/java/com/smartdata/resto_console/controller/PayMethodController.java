package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.PayMethodService;

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
@RequestMapping("/api/pay_method")
public class PayMethodController {

    @Autowired
    private PayMethodService payMethodService;

    @PreAuthorize("hasRole('ADMIN')")  // allows only ADMIN role to access this api /add, if more than one role use hasAnyRole('','')
    @PostMapping("/add")
    public void addPayMethod(@RequestParam String pay_mtd_desc, @RequestParam Integer parent_pay_mtd_id, @RequestParam String is_category, @RequestParam String picture_src, 
            @RequestParam String need_ref, @RequestParam String need_expdt, @RequestParam String short_nm, @RequestParam String active_flag, 
            @RequestParam Double bank_charges, @RequestParam Integer sm_pay_type) {
        payMethodService.addPayMethod(pay_mtd_desc, parent_pay_mtd_id, is_category, picture_src, need_ref, 
            need_expdt, short_nm, active_flag, bank_charges, sm_pay_type);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updatePayMethod(@PathVariable Integer id, @RequestParam String pay_mtd_desc, @RequestParam Integer parent_pay_mtd_id, @RequestParam String is_category, @RequestParam String picture_src, 
            @RequestParam String need_ref, @RequestParam String need_expdt, @RequestParam String short_nm, @RequestParam String active_flag, 
            @RequestParam Double bank_charges, @RequestParam Integer sm_pay_type) {
        payMethodService.updatePayMethod(id, pay_mtd_desc, parent_pay_mtd_id, is_category, picture_src, need_ref, 
            need_expdt, short_nm, active_flag, bank_charges, sm_pay_type);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deletePayMethod(@PathVariable Integer id) {
        payMethodService.deletePayMethod(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<PayMethod>> getPayMethod(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(payMethodService.getPayMethod(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<PayMethod>> getPayMethods(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(payMethodService.getPayMethods(search));
    }    
}
