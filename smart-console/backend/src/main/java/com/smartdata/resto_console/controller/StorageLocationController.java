package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.StorageLocationService;

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
@RequestMapping("/api/storage_location")
public class StorageLocationController {
    @Autowired
    private StorageLocationService storageLocationService;

    @PreAuthorize("hasRole('ADMIN')")  // allows only ADMIN role to access this api /add, if more than one role use hasAnyRole('','')
    @PostMapping("/add")
    public void addStorageLocation(@RequestParam String location_nm) {
        storageLocationService.addStorageLocation(location_nm);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateStorageLocation(@PathVariable Integer id, @RequestParam String location_nm) {
        storageLocationService.updateStorageLocation(id, location_nm);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteStorageLocation(@PathVariable Integer id) {
        storageLocationService.deleteStorageLocation(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<StorageLocation>> getStorageLocation(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(storageLocationService.getStorageLocation(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<StorageLocation>> getStorageLocations(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(storageLocationService.getStorageLocations(search));
    }    
}
