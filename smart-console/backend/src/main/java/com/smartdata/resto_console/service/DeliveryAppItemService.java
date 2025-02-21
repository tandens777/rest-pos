package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.DeliveryAppItem;
import com.smartdata.resto_console.repository.DeliveryAppItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DeliveryAppItemService {

    @Autowired
    private DeliveryAppItemRepository dlvryAppItemRepository;

    @Transactional
    public void updateDeliveryAppItemPrice(Integer item_id, List<DeliveryAppItem> app_prices) {
        for (DeliveryAppItem app_price : app_prices) {
            dlvryAppItemRepository.updateDeliveryAppItemPrice(app_price.getAppId(), item_id, app_price.getAppAddPcnt(), 
                app_price.getAppAddAmt(), app_price.getAppPrice(), app_price.getActiveFlag());
        }
    }

    @Transactional
    public void deleteDeliveryAppItemPrice(Integer app_id, Integer item_id) {
        dlvryAppItemRepository.deleteDeliveryAppItemPrice(app_id, item_id);
    }

    public List<DeliveryAppItem> getDeliveryAppItems(Integer itemId) {
        // Sort by tbl_num in ascending order
        return dlvryAppItemRepository.findByItemId(itemId);
    }
}