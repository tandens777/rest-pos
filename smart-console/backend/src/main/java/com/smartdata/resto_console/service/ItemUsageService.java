package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.ItemUsage;
import com.smartdata.resto_console.repository.ItemUsageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemUsageService {

    @Autowired
    private ItemUsageRepository itemUsageRepository;

    @Transactional
    public void updateItemUsage(Integer item_id, List<ItemUsage> usage_items) {
        for (ItemUsage usage_item : usage_items) {
            itemUsageRepository.updateItemUsage(item_id, usage_item.getRmItemId(), usage_item.getUsedQty(), usage_item.getUnitCode());
        }
    }

    @Transactional
    public void deleteItemUsage(Integer item_id, Integer rm_item_id) {
        itemUsageRepository.deleteItemUsage(item_id, rm_item_id);
    }    

    public List<ItemUsage> getItemUsage(Integer itemId) {
        // Sort by tbl_num in ascending order
        return itemUsageRepository.findByItemId(itemId);
    }
}