package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.ItemGroupService;

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
@RequestMapping("/api/item_group")
public class ItemGroupController {

    @Autowired
    private ItemGroupService itemGroupService;

    @PreAuthorize("hasRole('ADMIN')")  // allows only ADMIN role to access this api /add, if more than one role use hasAnyRole('','')
    @PostMapping("/add")
    public void addItemGroup(@RequestParam String item_grp_desc) {
        itemGroupService.addItemGroup(item_grp_desc);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateItemGroup(@PathVariable Integer id, @RequestParam String item_grp_desc) {
        itemGroupService.updateItemGroup(id, item_grp_desc);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteItemGroup(@PathVariable Integer id) {
        itemGroupService.deleteItemGroup(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<ItemGroup>> getItemGroup(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(itemGroupService.getItemGroup(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ItemGroup>> getItemGroup(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(itemGroupService.getItemGroups(search));
    }    
}
