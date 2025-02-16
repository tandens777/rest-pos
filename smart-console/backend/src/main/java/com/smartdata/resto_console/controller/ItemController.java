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
            @RequestParam String itemCode,
            @RequestParam String itemDesc,
            @RequestParam(required = false) String shortNm,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(required = false) String chineseItemDesc,
            @RequestParam Integer catTypeId,
            @RequestParam(required = false) Integer parentCatId,
            @RequestParam(required = false) Integer stationId,
            @RequestParam(required = false) String per100gFlag,
            @RequestParam(required = false) Double defaultPrice,
            @RequestParam(required = false) Double addonPrice,
            @RequestParam(required = false) String pictureSrc,
            @RequestParam String defaultUnitCode,
            @RequestParam String discExempt,
            @RequestParam String allowScOnExempt,
            @RequestParam String nonVatFlag,
            @RequestParam String activeFlag,
            @RequestParam String showOnPosFlag,
            @RequestParam Integer reorderLimit,
            @RequestParam String trackInvtyFlag,
            @RequestParam String sendToPrinterFlag,
            @RequestParam String allowDineinFlag,
            @RequestParam String allowPickupFlag,
            @RequestParam String allowDeliveryFlag,
            @RequestParam String lastupduserid) {

        itemService.addItem(itemCode, itemDesc, shortNm, sortOrder, chineseItemDesc, catTypeId, parentCatId,
                stationId, per100gFlag, defaultPrice, addonPrice, pictureSrc, defaultUnitCode, discExempt,
                allowScOnExempt, nonVatFlag, activeFlag, showOnPosFlag, reorderLimit, trackInvtyFlag,
                sendToPrinterFlag, allowDineinFlag, allowPickupFlag, allowDeliveryFlag, lastupduserid);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public void updateItem(
            @PathVariable Integer id,
            @RequestParam String itemCode,
            @RequestParam String itemDesc,
            @RequestParam(required = false) String shortNm,
            @RequestParam(required = false) Integer sortOrder,
            @RequestParam(required = false) String chineseItemDesc,
            @RequestParam Integer catTypeId,
            @RequestParam(required = false) Integer parentCatId,
            @RequestParam(required = false) Integer stationId,
            @RequestParam(required = false) String per100gFlag,
            @RequestParam(required = false) Double defaultPrice,
            @RequestParam(required = false) Double addonPrice,
            @RequestParam(required = false) String pictureSrc,
            @RequestParam String defaultUnitCode,
            @RequestParam String discExempt,
            @RequestParam String allowScOnExempt,
            @RequestParam String nonVatFlag,
            @RequestParam String activeFlag,
            @RequestParam String showOnPosFlag,
            @RequestParam Integer reorderLimit,
            @RequestParam String trackInvtyFlag,
            @RequestParam String sendToPrinterFlag,
            @RequestParam String allowDineinFlag,
            @RequestParam String allowPickupFlag,
            @RequestParam String allowDeliveryFlag,
            @RequestParam String lastupduserid) {

        itemService.updateItem(id, itemCode, itemDesc, shortNm, sortOrder, chineseItemDesc, catTypeId, parentCatId,
                stationId, per100gFlag, defaultPrice, addonPrice, pictureSrc, defaultUnitCode, discExempt,
                allowScOnExempt, nonVatFlag, activeFlag, showOnPosFlag, reorderLimit, trackInvtyFlag,
                sendToPrinterFlag, allowDineinFlag, allowPickupFlag, allowDeliveryFlag, lastupduserid);
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
