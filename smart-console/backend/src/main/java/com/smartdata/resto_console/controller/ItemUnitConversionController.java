package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.ItemUnitConversion;
import com.smartdata.resto_console.service.ItemUnitConversionService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/item_unit_conversion")
public class ItemUnitConversionController {

    @Autowired
    private ItemUnitConversionService itemUnitConversionService;

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{item_id}")
    public ResponseEntity<String> updateItemUnitConversion(
            @PathVariable Integer item_id,
            @RequestBody List<ItemUnitConversion> conv_units) {
        itemUnitConversionService.updateItemUnitConversion(item_id, conv_units);
        return ResponseEntity.ok("Item Unit Conversions updated successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<List<ItemUnitConversion>> getItemUnitConversion(@RequestParam Integer item_id) throws GenericNotFoundException {
        return ResponseEntity.ok(itemUnitConversionService.getItemUnitConversion(item_id));
    }    

}
