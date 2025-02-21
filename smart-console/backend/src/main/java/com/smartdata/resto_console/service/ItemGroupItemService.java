package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.ItemGroupItem;
import com.smartdata.resto_console.repository.ItemGroupItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.dto.ItemGroupItemDTO;

import java.util.List;

@Service
public class ItemGroupItemService {

    @Autowired
    private ItemGroupItemRepository itemGroupItemRepository;

    @Transactional
    public void updateItemGroupItems(Integer item_grp_id, List<ItemGroupItem> grp_items) {
        itemGroupItemRepository.deleteItemGroupItem(item_grp_id);
        for (ItemGroupItem grp_item : grp_items) {
            itemGroupItemRepository.updateItemGroupItems(item_grp_id, grp_item.getItemId(), grp_item.getAddonPrice());
        }
    }

    public List<ItemGroupItemDTO> getItemGroupItems(Integer itemGrpId) {
        // Sort by tbl_num in ascending order
        return itemGroupItemRepository.findByItemGrpId(itemGrpId);
    }
}