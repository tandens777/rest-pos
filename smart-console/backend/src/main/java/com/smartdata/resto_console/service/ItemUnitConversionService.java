package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.ItemUnitConversion;
import com.smartdata.resto_console.repository.ItemUnitConversionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemUnitConversionService {

    @Autowired
    private ItemUnitConversionRepository itemUnitConversionRepository;

    public void updateItemUnitConversion(Integer item_id, List<ItemUnitConversion> conv_units) {
        for (ItemUnitConversion conv_unit : conv_units) {
            itemUnitConversionRepository.updateItemUnitConversion(item_id, conv_unit.getUnitCode(), conv_unit.getConversionToDefault());
        }
    }

    public List<ItemUnitConversion> getItemUnitConversion(Integer itemId) {
        // Sort by tbl_num in ascending order
        return itemUnitConversionRepository.findByItemId(itemId);
    }
}