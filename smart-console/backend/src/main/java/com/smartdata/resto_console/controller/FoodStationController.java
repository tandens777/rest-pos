package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.FloorService;
import com.smartdata.resto_console.service.FoodStationService;

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
@RequestMapping("/api/food_station")
public class FoodStationController {
    @Autowired
    private FoodStationService foodStationService;

    @PreAuthorize("hasRole('ADMIN')")  // allows only ADMIN role to access this api /add, if more than one role use hasAnyRole('','')
    @PostMapping("/add")
    public void addFoodStation(@RequestParam String station_nm) {
        foodStationService.addFoodStation(station_nm);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateFoodStation(@PathVariable Integer id, @RequestParam String station_nm) {
        foodStationService.updateFoodStation(id, station_nm);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteFoodStation(@PathVariable Integer id) {
        foodStationService.deleteFoodStation(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<FoodStation>> getFoodStation(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(foodStationService.getFoodStation(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<FoodStation>> getFoodStations(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(foodStationService.getFoodStations(search));
    }    
}
