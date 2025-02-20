package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.ItemTagItem;
import com.smartdata.resto_console.repository.ItemTagItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemTagItemService {

    @Autowired
    private ItemTagItemRepository itemTagItemRepository;

    @Transactional
    public void updateItemTagItems(Integer item_id, List<ItemTagItem> tag_items) {
        for (ItemTagItem tag_item : tag_items) {
            itemTagItemRepository.updateItemTagItems(tag_item.getItemTagId(), item_id);
        }
    }

    @Transactional
    public void deleteItemTagItem(Integer item_tag_id, Integer item_id) {
        itemTagItemRepository.deleteItemTagItem(item_tag_id, item_id);
    }

    public List<ItemTagItem> getItemTagItems(Integer itemId) {
        // Sort by tbl_num in ascending order
        return itemTagItemRepository.findByItemId(itemId);
    }

}