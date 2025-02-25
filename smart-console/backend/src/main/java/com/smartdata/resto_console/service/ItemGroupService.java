package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.smartdata.resto_console.repository.ItemGroupRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.ItemGroup;

@Service
public class ItemGroupService {
    
    @Autowired
    private ItemGroupRepository itemGroupRepository;

    @Transactional
    public Optional<ItemGroup> addItemGroup(String itemGrpDesc) {
        itemGroupRepository.addItemGroup(itemGrpDesc);

        List<ItemGroup> itemGroups = itemGroupRepository.findByItemGrpDescContainingIgnoreCaseOrderByItemGrpDesc(itemGrpDesc);

        if (!itemGroups.isEmpty()) {
            return Optional.of(itemGroups.get(0)); // Return the first item
        } else {
            throw new GenericNotFoundException("add failed for item group " + itemGrpDesc);
        }        
    }

    @Transactional
    public void updateItemGroup(Integer itemGrpId, String itemGrpDesc) {
        itemGroupRepository.updateItemGroup(itemGrpId, itemGrpDesc);
    }

    @Transactional
    public void deleteItemGroup(Integer id) {
        itemGroupRepository.deleteItemGroup(id);
    }

    public Optional<ItemGroup> getItemGroup(Integer itemGrpId) throws GenericNotFoundException {
        Optional<ItemGroup> itemGroup = itemGroupRepository.findById(itemGrpId);

        if (itemGroup.isPresent()) {
            return itemGroup;
        } else {
            throw new GenericNotFoundException("Item Group not found with id: " + itemGrpId);
        }
    }

    // copy sample for retrieving all records or by search word and sorted
    public List<ItemGroup> getItemGroups(String searchTerm) throws GenericNotFoundException {
        List<ItemGroup> itemGroups;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            itemGroups = itemGroupRepository.findByItemGrpDescContainingIgnoreCaseOrderByItemGrpDesc(searchTerm);
        } else {
            itemGroups = itemGroupRepository.findAllByOrderByItemGrpDesc();
        }

        if (!itemGroups.isEmpty()) {
            return itemGroups;
        } else {
            throw new GenericNotFoundException("No item groups found");
        }
    }
}
