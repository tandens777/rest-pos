package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.ItemUsage;
import com.smartdata.resto_console.service.ItemUsageService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/item_usage")
public class ItemUsageController {

    @Autowired
    private ItemUsageService itemUsageService;

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{item_id}")
    public ResponseEntity<String> updateItemUsage(
            @PathVariable Integer item_id,
            @RequestBody List<ItemUsage> usage_items) {
        itemUsageService.updateItemUsage(item_id, usage_items);
        return ResponseEntity.ok("Item Usage updated successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<List<ItemUsage>> getItemUsage(@RequestParam Integer item_id) throws GenericNotFoundException {
        return ResponseEntity.ok(itemUsageService.getItemUsage(item_id));
    }    

}
