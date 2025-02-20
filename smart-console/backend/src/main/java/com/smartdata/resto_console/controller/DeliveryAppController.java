package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.*;
import com.smartdata.resto_console.service.DeliveryAppService;
import com.smartdata.resto_console.service.DeliveryAppItemService;

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
@RequestMapping("/api/delivery_apps")
public class DeliveryAppController {

    @Autowired
    private DeliveryAppService dlvryAppService;

    @Autowired
    private DeliveryAppItemService dlvryAppItemService;

    @PreAuthorize("hasRole('ADMIN')")  // allows only ADMIN role to access this api /add, if more than one role use hasAnyRole('','')
    @PostMapping("/add")
    public void addDeliveryApp(@RequestParam String app_nm, @RequestParam String order_type, @RequestParam String active_flag, 
            @RequestParam Integer table_count, @RequestParam String pic_filename, @RequestParam Double app_add_pcnt, @RequestParam Double app_add_amt) {
        dlvryAppService.addDeliveryApp(app_nm, order_type, active_flag, table_count, pic_filename, app_add_pcnt, app_add_amt);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateDeliveryApp(@PathVariable Integer id, @RequestParam String app_nm, @RequestParam String order_type, @RequestParam String active_flag, 
            @RequestParam Integer table_count, @RequestParam String pic_filename, @RequestParam Double app_add_pcnt, @RequestParam Double app_add_amt) {
        dlvryAppService.updateDeliveryApp(id, app_nm, order_type, active_flag, table_count, pic_filename, app_add_pcnt, app_add_amt);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteDeliveryApp(@PathVariable Integer id) {
        dlvryAppService.deleteDeliveryApp(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<DeliveryApp>> getDeliveryApp(@PathVariable Integer id) throws GenericNotFoundException {
        return ResponseEntity.ok(dlvryAppService.getDeliveryApp(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<DeliveryApp>> getDeliveryApps(@RequestParam(required = false) String search) throws GenericNotFoundException {
        return ResponseEntity.ok(dlvryAppService.getDeliveryApps(search));
    }    

    //---------------------------- DeliveryAppItemPrice ----------------------------
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update_item_prices/{item_id}")
    public ResponseEntity<String> updateDeliveryAppItemPrice(
            @PathVariable Integer item_id,
            @RequestBody List<DeliveryAppItem> app_prices) {
        dlvryAppItemService.updateDeliveryAppItemPrice(item_id, app_prices);
        return ResponseEntity.ok("Delivery App Prices updated successfully.");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get_item_prices")
    public ResponseEntity<List<DeliveryAppItem>> getDeliveryAppItems(@RequestParam Integer item_id) throws GenericNotFoundException {
        return ResponseEntity.ok(dlvryAppItemService.getDeliveryAppItems(item_id));
    }


}
