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
    public void addPayMethod(@RequestParam String pay_mtd_desc, @RequestParam(required = false) Integer parent_pay_mtd_id, @RequestParam String is_category, @RequestParam(required = false) String picture_src, 
            @RequestParam String need_ref, @RequestParam String need_expdt, @RequestParam(required = false) String short_nm, @RequestParam String active_flag, 
            @RequestParam(required = false) Double bank_charges, @RequestParam(required = false) Integer sm_pay_type, @RequestParam(required = false) Integer sort_order) {
        payMethodService.addPayMethod(pay_mtd_desc, parent_pay_mtd_id, is_category, picture_src, need_ref, 
            need_expdt, short_nm, active_flag, bank_charges, sm_pay_type, sort_order);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updatePayMethod(@PathVariable Integer id, @RequestParam String pay_mtd_desc, @RequestParam(required = false) Integer parent_pay_mtd_id, @RequestParam String is_category, @RequestParam(required = false) String picture_src, 
            @RequestParam String need_ref, @RequestParam String need_expdt, @RequestParam(required = false) String short_nm, @RequestParam String active_flag, 
            @RequestParam(required = false) Double bank_charges, @RequestParam(required = false) Integer sm_pay_type, @RequestParam(required = false) Integer sort_order) {
        payMethodService.updatePayMethod(id, pay_mtd_desc, parent_pay_mtd_id, is_category, picture_src, need_ref, 
            need_expdt, short_nm, active_flag, bank_charges, sm_pay_type, sort_order);
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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all_subitems/{parentPayMtdId}")
    public ResponseEntity<List<PayMethod>> getChildPayMethods(@PathVariable Integer parentPayMtdId) throws GenericNotFoundException {
        return ResponseEntity.ok(payMethodService.getChildPayMethods(parentPayMtdId));
    }    

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getcategories")
    public ResponseEntity<List<PayMethod>> getPayMethodCategories() {
        return ResponseEntity.ok(payMethodService.getPayMethodCategories());
    }    

}
