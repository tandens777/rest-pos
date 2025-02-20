package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.ItemSetMenu;
import com.smartdata.resto_console.repository.ItemSetMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemSetMenuService {

    @Autowired
    private ItemSetMenuRepository itemSetMenuRepository;

    public void updateItemSetMenu(Integer item_id, List<ItemSetMenu> menu_items) {
        for (ItemSetMenu menu_item : menu_items) {
            itemSetMenuRepository.updateItemSetMenu(item_id, menu_item.getSetDtlId(), menu_item.getMenuItemGrpId(), menu_item.getMenuItemId(), menu_item.getQty(), menu_item.getSetAddonPrice(), menu_item.getSortOrder());
        }
    }

    @Transactional
    public void deleteItemSetMenu(Integer set_item_id, Integer set_dtl_id) {
        itemSetMenuRepository.deleteItemSetMenu(set_item_id, set_dtl_id);
    }

    public List<ItemSetMenu> getItemSetMenu(Integer itemId) {
        // Sort by tbl_num in ascending order
        return itemSetMenuRepository.findByItemId(itemId);
    }
}