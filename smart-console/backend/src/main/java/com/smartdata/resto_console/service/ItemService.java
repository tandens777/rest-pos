package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.ItemRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import com.smartdata.resto_console.model.Item;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Transactional
    public void addItem(
            String itemCode, String itemDesc, String shortNm, Integer sortOrder, String chineseItemDesc,
            Integer catTypeId, Integer parentCatId, Integer stationId, String per100gFlag,
            Double defaultPrice, Double addonPrice, String pictureSrc, String defaultUnitCode,
            String discExempt, String allowScOnExempt, String nonVatFlag, String activeFlag,
            String showOnPosFlag, Integer reorderLimit, String trackInvtyFlag, String sendToPrinterFlag,
            String allowDineinFlag, String allowPickupFlag, String allowDeliveryFlag, String lastUpdatedUserId) {

        itemRepository.insertItem(itemCode, itemDesc, shortNm, sortOrder, chineseItemDesc,
                catTypeId, parentCatId, stationId, per100gFlag, defaultPrice, addonPrice, pictureSrc,
                defaultUnitCode, discExempt, allowScOnExempt, nonVatFlag, activeFlag, showOnPosFlag,
                reorderLimit, trackInvtyFlag, sendToPrinterFlag, allowDineinFlag, allowPickupFlag,
                allowDeliveryFlag, lastUpdatedUserId);
    }

    @Transactional
    public void updateItem(
            Integer id, String itemCode, String itemDesc, String shortNm, Integer sortOrder, String chineseItemDesc,
            Integer catTypeId, Integer parentCatId, Integer stationId, String per100gFlag,
            Double defaultPrice, Double addonPrice, String pictureSrc, String defaultUnitCode,
            String discExempt, String allowScOnExempt, String nonVatFlag, String activeFlag,
            String showOnPosFlag, Integer reorderLimit, String trackInvtyFlag, String sendToPrinterFlag,
            String allowDineinFlag, String allowPickupFlag, String allowDeliveryFlag, String lastUpdatedUserId) {

        itemRepository.updateItem(id, itemCode, itemDesc, shortNm, sortOrder, chineseItemDesc,
                catTypeId, parentCatId, stationId, per100gFlag, defaultPrice, addonPrice, pictureSrc,
                defaultUnitCode, discExempt, allowScOnExempt, nonVatFlag, activeFlag, showOnPosFlag,
                reorderLimit, trackInvtyFlag, sendToPrinterFlag, allowDineinFlag, allowPickupFlag,
                allowDeliveryFlag, lastUpdatedUserId);
    }

    @Transactional
    public void deleteItem(Integer id) {
        itemRepository.deleteItem(id);
    }

    public Optional<Item> getItem(Integer id) throws GenericNotFoundException {
        Optional<Item> item = itemRepository.findById(id);

        if (item.isPresent()) {
            return item;
        } else {
            throw new GenericNotFoundException("Item not found with id: " + id);
        }
    }

    public List<Item> getItems(String searchTerm) throws GenericNotFoundException {
        List<Item> items;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            items = itemRepository.findByItemDescContainingIgnoreCaseOrderBySortOrder(searchTerm);
        } else {
            items = itemRepository.findAllByOrderBySortOrder();
        }

        if (!items.isEmpty()) {
            return items;
        } else {
            throw new GenericNotFoundException("No items found.");
        }
    }

    public List<Item> getItemCategories() {
        List<Item> items;
        items = itemRepository.findByCatTypeIdOrderBySortOrder(1); // Assuming category type ID 1 means "category"

        if (!items.isEmpty()) {
            return items;
        } else {
            return null;
        }
    }

    public List<Item> getChildItems(Integer parentCatId) {
        if (parentCatId == null) {
            parentCatId = 0; // Return empty list if parent_id is null
        }

        List<Item> items = itemRepository.findChildItems(parentCatId);

        return items != null ? items : new ArrayList<>(); // Ensure non-null return
    }
}
