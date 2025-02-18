package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.smartdata.resto_console.repository.ItemTagRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.ItemTag;

@Service
public class ItemTagService {
    
    @Autowired
    private ItemTagRepository itemTagRepository;

    @Transactional
    public void addItemTag(String itemTagDesc) {
        itemTagRepository.addItemTag(itemTagDesc);
    }

    @Transactional
    public void updateItemTag(Integer itemTagId, String itemTagDesc) {
        itemTagRepository.updateItemTag(itemTagId, itemTagDesc);
    }

    @Transactional
    public void deleteItemTag(Integer id) {
        itemTagRepository.deleteItemTag(id);
    }

    public Optional<ItemTag> getItemTag(Integer itemTagId) throws GenericNotFoundException {
        Optional<ItemTag> itemTag = itemTagRepository.findById(itemTagId);

        if (itemTag.isPresent()) {
            return itemTag;
        } else {
            throw new GenericNotFoundException("Item Tag not found with id: " + itemTagId);
        }
    }

    // copy sample for retrieving all records or by search word and sorted
    public List<ItemTag> getItemTags(String searchTerm) throws GenericNotFoundException {
        List<ItemTag> itemTags;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            itemTags = itemTagRepository.findByNameContainingIgnoreCaseOrderByName(searchTerm);
        } else {
            itemTags = itemTagRepository.findAllByOrderByItemTagDesc();
        }

        if (!itemTags.isEmpty()) {
            return itemTags;
        } else {
            throw new GenericNotFoundException("No item tags found");
        }
    }
}
