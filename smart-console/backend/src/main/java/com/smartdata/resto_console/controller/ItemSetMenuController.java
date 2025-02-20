package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.ItemSetMenu;
import com.smartdata.resto_console.service.ItemSetMenuService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/item_set_menu")
public class ItemSetMenuController {

    @Autowired
    private ItemSetMenuService itemSetMenuService;

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{item_id}")
    public ResponseEntity<String> updateItemSetMenu(
            @PathVariable Integer item_id,
            @RequestBody List<ItemSetMenu> menu_items) {
        itemSetMenuService.updateItemSetMenu(item_id, menu_items);
        return ResponseEntity.ok("Item Usage updated successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<List<ItemSetMenu>> getItemSetMenu(@RequestParam Integer item_id) throws GenericNotFoundException {
        return ResponseEntity.ok(itemSetMenuService.getItemSetMenu(item_id));
    }    

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public void deleteItemSetMenu(@RequestParam Integer set_item_id, @RequestParam Integer set_dtl_id) {
        itemSetMenuService.deleteItemSetMenu(set_item_id, set_dtl_id);
    }

}
