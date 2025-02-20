package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.ItemUnitConversion;
import com.smartdata.resto_console.repository.ItemUnitConversionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemUnitConversionService {

    @Autowired
    private ItemUnitConversionRepository itemUnitConversionRepository;

    @Transactional
    public void updateItemUnitConversion(Integer item_id, List<ItemUnitConversion> conv_units) {
        for (ItemUnitConversion conv_unit : conv_units) {
            itemUnitConversionRepository.updateItemUnitConversion(item_id, conv_unit.getUnitCode(), conv_unit.getConversionToDefault());
        }
    }

    @Transactional
    public void deleteItemUnitConversion(Integer item_id, String unit_code) {
        itemUnitConversionRepository.deleteItemUnitConversion(item_id, unit_code);
    }

    public List<ItemUnitConversion> getItemUnitConversion(Integer itemId) {
        // Sort by tbl_num in ascending order
        return itemUnitConversionRepository.findByItemId(itemId);
    }
}