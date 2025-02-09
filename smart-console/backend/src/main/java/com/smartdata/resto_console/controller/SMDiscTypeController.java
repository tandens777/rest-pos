package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.smartdata.resto_console.dto.SMDiscTypeDTO;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SMDiscTypeController {

    private final EntityManager entityManager;

    @Autowired
    public SMDiscTypeController(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/sm_disc_types")
    public ResponseEntity<List<SMDiscTypeDTO>> getAllSMDiscTypes() {
        List<Object[]> results = entityManager.createNativeQuery("SELECT sm_discount_type, sm_discount_type_desc FROM sm_discount_type order by sm_discount_type").getResultList();

        List<SMDiscTypeDTO> dtoList = results.stream()
            .map(row -> new SMDiscTypeDTO(
                    (Integer) row[0],
                    (String) row[1]
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}
