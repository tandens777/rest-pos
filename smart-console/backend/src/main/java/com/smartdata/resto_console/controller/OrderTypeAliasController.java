package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.OrderTypeAliasService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/order_type")
public class OrderTypeAliasController {

    @Autowired
    private OrderTypeAliasService aliasService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/generate")
    public void generateOrderTypeAlias(@RequestParam String order_type, @RequestParam String skip_nums, @RequestParam int start_num ) {
        aliasService.generateOrderTypeAlias(order_type, skip_nums, start_num);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{order_type}")
    public ResponseEntity<String> updateOrderTypeAliases(
            @PathVariable String order_type,
            @RequestBody List<OrderTypeAlias> aliases) {
        aliasService.updateOrderTypeAliases(order_type, aliases);
        return ResponseEntity.ok("Order type aliases updated successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAliases")
    public ResponseEntity<List<OrderTypeAlias>> getOrderTypeAliases(@RequestParam String order_type) throws GenericNotFoundException {
        return ResponseEntity.ok(aliasService.getOrderTypeAliases(order_type));
    }
}