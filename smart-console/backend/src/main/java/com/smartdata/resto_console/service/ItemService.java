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
        String item_code, String item_desc, String short_nm, Integer sort_order, String chinese_item_desc,
        Integer cat_type_id, Integer parent_cat_id, String is_category, Integer station_id, String per100g_flag,
        Double default_price, Double addon_price, String picture_src, String default_unit_code,
        String disc_exempt, String allow_sc_on_exempt, String non_vat_flag, String active_flag,
        String show_on_pos_flag, Integer reorder_limit, String track_invty_flag, String send_to_printer_flag,
        String allow_dinein_flag, String allow_pickup_flag, String allow_delivery_flag, String lastupduserid) {

        itemRepository.insertItem(item_code, item_desc, short_nm, sort_order, chinese_item_desc,
                cat_type_id, parent_cat_id, is_category, station_id, per100g_flag, default_price, addon_price, picture_src,
                default_unit_code, disc_exempt, allow_sc_on_exempt, non_vat_flag, active_flag, show_on_pos_flag,
                reorder_limit, track_invty_flag, send_to_printer_flag, allow_dinein_flag, allow_pickup_flag,
                allow_delivery_flag, lastupduserid);
    }

    @Transactional
    public void updateItem(
            Integer id, String item_code, String item_desc, String short_nm, Integer sort_order, String chinese_item_desc,
            Integer cat_type_id, Integer parent_cat_id, String is_category, Integer station_id, String per100g_flag,
            Double default_price, Double addon_price, String picture_src, String default_unit_code,
            String disc_exempt, String allow_sc_on_exempt, String non_vat_flag, String active_flag,
            String show_on_pos_flag, Integer reorder_limit, String track_invty_flag, String send_to_printer_flag,
            String allow_dinein_flag, String allow_pickup_flag, String allow_delivery_flag, String lastupduserid) {

        itemRepository.updateItem(id, item_code, item_desc, short_nm, sort_order, chinese_item_desc,
                cat_type_id, parent_cat_id, is_category, station_id, per100g_flag, default_price, addon_price, picture_src,
                default_unit_code, disc_exempt, allow_sc_on_exempt, non_vat_flag, active_flag, show_on_pos_flag,
                reorder_limit, track_invty_flag, send_to_printer_flag, allow_dinein_flag, allow_pickup_flag,
                allow_delivery_flag, lastupduserid);
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
        items = itemRepository.findByIsCategoryContainingIgnoreCaseOrderBySortOrder("Y");

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
