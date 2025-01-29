package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.DeliveryAppService;

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
@RequestMapping("/api/delivery_apps")
public class DeliveryAppController {

    @Autowired
    private DeliveryAppService dlvryAppService;

    @PreAuthorize("hasRole('ADMIN')")  // allows only ADMIN role to access this api /add, if more than one role use hasAnyRole('','')
    @PostMapping("/add")
    public void addDeliveryApp(@RequestParam String app_nm, @RequestParam String order_type, @RequestParam String active_flag, @RequestParam Integer table_count, @RequestParam String pic_filename) {
        dlvryAppService.addDeliveryApp(app_nm, order_type, active_flag, table_count, pic_filename);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateDeliveryApp(@PathVariable Integer id, @RequestParam String app_nm, @RequestParam String order_type, @RequestParam String active_flag, @RequestParam Integer table_count, @RequestParam String pic_filename) {
        dlvryAppService.updateDeliveryApp(id, app_nm, order_type, active_flag, table_count, pic_filename);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteDeliveryApp(@PathVariable Integer id) {
        dlvryAppService.deleteDeliveryApp(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<DeliveryApp>> getDeliveryApp(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(dlvryAppService.getDeliveryApp(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<DeliveryApp>> getDeliveryApps(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(dlvryAppService.getDeliveryApps(search));
    }    
}
