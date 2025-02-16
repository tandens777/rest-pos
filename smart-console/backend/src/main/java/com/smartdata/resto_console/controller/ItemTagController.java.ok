package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.ItemTagService;

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
@RequestMapping("/api/item_tag")
public class ItemTagController {

    @Autowired
    private ItemTagService itemTagService;

    @PreAuthorize("hasRole('ADMIN')")  // allows only ADMIN role to access this api /add, if more than one role use hasAnyRole('','')
    @PostMapping("/add")
    public void addItemTag(@RequestParam String item_tag_desc) {
        itemTagService.addItemTag(item_tag_desc);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateItemTag(@PathVariable Integer id, @RequestParam String item_tag_desc) {
        itemTagService.updateItemTag(id, item_tag_desc);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteItemTag(@PathVariable Integer id) {
        itemTagService.deleteItemTag(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<ItemTag>> getItemTag(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(itemTagService.getItemTag(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ItemTag>> getItemTags(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(itemTagService.getItemTags(search));
    }    
}
