package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.Item;
import com.smartdata.resto_console.service.ItemService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;

import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public void addItem(
        @RequestParam(required = false) String item_code,
        @RequestParam String item_desc,
        @RequestParam(required = false) String short_nm,
        @RequestParam(required = false) Integer sort_order,
        @RequestParam(required = false) String chinese_item_desc,
        @RequestParam Integer cat_type_id,
        @RequestParam(required = false) Integer parent_cat_id,
        @RequestParam String is_category,
        @RequestParam(required = false) Integer station_id,
        @RequestParam(required = false) String per100g_flag,
        @RequestParam(required = false) Double default_price,
        @RequestParam(required = false) Double addon_price,
        @RequestParam(required = false) String picture_src,
        @RequestParam String default_unit_code,
        @RequestParam String disc_exempt,
        @RequestParam String allow_sc_on_exempt,
        @RequestParam String non_vat_flag,
        @RequestParam String active_flag,
        @RequestParam String show_on_pos_flag,
        @RequestParam Integer reorder_limit,
        @RequestParam String track_invty_flag,
        @RequestParam String send_to_printer_flag,
        @RequestParam String allow_dinein_flag,
        @RequestParam String allow_pickup_flag,
        @RequestParam String allow_delivery_flag,
        @RequestParam String lastupduserid) {
        
            itemService.addItem(item_code, item_desc, short_nm, sort_order, chinese_item_desc, cat_type_id, parent_cat_id, is_category,
                    station_id, per100g_flag, default_price, addon_price, picture_src, default_unit_code, disc_exempt,
                    allow_sc_on_exempt, non_vat_flag, active_flag, show_on_pos_flag, reorder_limit, track_invty_flag,
                    send_to_printer_flag, allow_dinein_flag, allow_pickup_flag, allow_delivery_flag, lastupduserid);
    }
        
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateItem(
            @PathVariable Integer id,
            @RequestParam(required = false) String item_code,
            @RequestParam String item_desc,
            @RequestParam(required = false) String short_nm,
            @RequestParam(required = false) Integer sort_order,
            @RequestParam(required = false) String chinese_item_desc,
            @RequestParam Integer cat_type_id,
            @RequestParam(required = false) Integer parent_cat_id,
            @RequestParam String is_category,
            @RequestParam(required = false) Integer station_id,
            @RequestParam(required = false) String per100g_flag,
            @RequestParam(required = false) Double default_price,
            @RequestParam(required = false) Double addon_price,
            @RequestParam(required = false) String picture_src,
            @RequestParam String default_unit_code,
            @RequestParam String disc_exempt,
            @RequestParam String allow_sc_on_exempt,
            @RequestParam String non_vat_flag,
            @RequestParam String active_flag,
            @RequestParam String show_on_pos_flag,
            @RequestParam Integer reorder_limit,
            @RequestParam String track_invty_flag,
            @RequestParam String send_to_printer_flag,
            @RequestParam String allow_dinein_flag,
            @RequestParam String allow_pickup_flag,
            @RequestParam String allow_delivery_flag,
            @RequestParam String lastupduserid) {
            
                itemService.updateItem(id, item_code, item_desc, short_nm, sort_order, chinese_item_desc, cat_type_id, parent_cat_id, is_category,
                        station_id, per100g_flag, default_price, addon_price, picture_src, default_unit_code, disc_exempt,
                        allow_sc_on_exempt, non_vat_flag, active_flag, show_on_pos_flag, reorder_limit, track_invty_flag,
                        send_to_printer_flag, allow_dinein_flag, allow_pickup_flag, allow_delivery_flag, lastupduserid);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteItem(@PathVariable Integer id) {
        itemService.deleteItem(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<Item>> getItem(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(itemService.getItem(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Item>> getItems(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(itemService.getItems(search));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all_subitems/{parentCatId}")
    public ResponseEntity<List<Item>> getChildItems(@PathVariable Integer parentCatId) throws GenericNotFoundException {
        return ResponseEntity.ok(itemService.getChildItems(parentCatId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getcategories")
    public ResponseEntity<List<Item>> getItemCategories() {
        return ResponseEntity.ok(itemService.getItemCategories());
    }
}
