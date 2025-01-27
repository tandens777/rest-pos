package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.OrderTypeAlias;
import com.smartdata.resto_console.repository.OrderTypeAliasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderTypeAliasService {

    @Autowired
    private OrderTypeAliasRepository aliasRepository;

    public void generateOrderTypeAlias(String orderType, String skipNums, int startNum) {
        aliasRepository.generateOrderTypeAlias(orderType, skipNums, startNum);
    }

    public void updateOrderTypeAliases(String orderType, List<OrderTypeAlias> aliases) {
        for (OrderTypeAlias alias : aliases) {
            aliasRepository.updateOrderTypeAlias(orderType, alias.getTblNum(), alias.getTblName(), 
                alias.getFloorId(), alias.getPicture(), alias.getPositionX(), alias.getPositionY());
        }
    }

    public List<OrderTypeAlias> getOrderTypeAliases(String orderType) {
        // Sort by tbl_num in ascending order
        return aliasRepository.findByOrderType(orderType);
    }
}