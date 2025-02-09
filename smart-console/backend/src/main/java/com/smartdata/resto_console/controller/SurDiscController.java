package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.SurchargeDiscount;
import com.smartdata.resto_console.service.SurDiscService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/surcharge_discount")
public class SurDiscController {

    @Autowired
    private SurDiscService surDiscService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public void addSurchargeDiscount(@RequestParam String disc_desc, @RequestParam String disc_type, @RequestParam Integer parent_disc_id, 
                                     @RequestParam String is_category, @RequestParam Double percentage, @RequestParam Double amt, 
                                     @RequestParam String picture_src, @RequestParam String need_ref, @RequestParam String short_nm, 
                                     @RequestParam String auto_flag, @RequestParam String need_authorization, @RequestParam String check_senior, 
                                     @RequestParam String active_flag, @RequestParam Integer sm_discount_type, @RequestParam String pcnt_on_nv_flag) {
        surDiscService.addSurchargeDiscount(disc_desc, disc_type, parent_disc_id, is_category, percentage, amt, picture_src, 
                                            need_ref, short_nm, auto_flag, need_authorization, check_senior, active_flag, sm_discount_type, pcnt_on_nv_flag);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateSurchargeDiscount(@PathVariable Integer id, @RequestParam String disc_desc, @RequestParam String disc_type, 
                                        @RequestParam Integer parent_disc_id, @RequestParam String is_category, @RequestParam Double percentage, 
                                        @RequestParam Double amt, @RequestParam String picture_src, @RequestParam String need_ref, 
                                        @RequestParam String short_nm, @RequestParam String auto_flag, @RequestParam String need_authorization, 
                                        @RequestParam String check_senior, @RequestParam String active_flag, @RequestParam Integer sm_discount_type, 
                                        @RequestParam String pcnt_on_nv_flag) {
        surDiscService.updateSurchargeDiscount(id, disc_desc, disc_type, parent_disc_id, is_category, percentage, amt, picture_src, 
                                               need_ref, short_nm, auto_flag, need_authorization, check_senior, active_flag, sm_discount_type, pcnt_on_nv_flag);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteSurchargeDiscount(@PathVariable Integer id) {
        surDiscService.deleteSurchargeDiscount(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<SurchargeDiscount>> getSurchargeDiscount(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(surDiscService.getSurchargeDiscount(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<SurchargeDiscount>> getSurchargeDiscounts(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(surDiscService.getSurchargeDiscounts(search));
    }
}
