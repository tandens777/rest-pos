package com.smartdata.resto_console.controller;

import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.smartdata.resto_console.model.Role;

import com.smartdata.resto_console.service.RoleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/all")
    public ResponseEntity<List<Role>> getRoles() throws GenericNotFoundException {
        return ResponseEntity.ok(roleService.getRoles());
    }        

    @PreAuthorize("hasRole('CASHIER')")
    @GetMapping("/name")
    public List<String> getRolesByName(@RequestParam String name) {
        return roleService.getRolesByName(name);
    }

}
