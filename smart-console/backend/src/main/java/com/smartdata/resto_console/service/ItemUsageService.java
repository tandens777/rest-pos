package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.ItemUsage;
import com.smartdata.resto_console.repository.ItemUsageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemUsageService {

    @Autowired
    private ItemUsageRepository itemUsageRepository;

    public void updateItemUsage(Integer item_id, List<ItemUsage> usage_items) {
        for (ItemUsage usage_item : usage_items) {
            itemUsageRepository.updateItemUsage(item_id, usage_item.getRmItemId(), usage_item.getUsedQty(), usage_item.getUnitCode());
        }
    }

    public List<ItemUsage> getItemUsage(Integer itemId) {
        // Sort by tbl_num in ascending order
        return itemUsageRepository.findByItemId(itemId);
    }
}