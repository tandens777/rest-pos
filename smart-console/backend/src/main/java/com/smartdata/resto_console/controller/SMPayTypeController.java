package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.smartdata.resto_console.dto.SMPayTypeDTO;

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
public class SMPayTypeController {

    private final EntityManager entityManager;

    @Autowired
    public SMPayTypeController(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/sm_pay_types")
    public ResponseEntity<List<SMPayTypeDTO>> getAllSMPayTypes() {
        List<Object[]> results = entityManager.createNativeQuery("SELECT sm_pay_type, sm_pay_type_desc FROM sm_pay_type order by sm_pay_type").getResultList();

        List<SMPayTypeDTO> dtoList = results.stream()
            .map(row -> new SMPayTypeDTO(
                    (Integer) row[0],
                    (String) row[1]
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}
