package com.smartdata.resto_console.controller;

import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.smartdata.resto_console.model.Role;

import com.smartdata.resto_console.service.RoleService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<String> getDistinctRoles() {
        return roleService.getDistinctRoles();
    }

    @PreAuthorize("hasRole('CASHIER')")
    @GetMapping("/name")
    public List<String> getRolesByName(@RequestParam String name) {
        return roleService.getRolesByName(name);
    }
}
