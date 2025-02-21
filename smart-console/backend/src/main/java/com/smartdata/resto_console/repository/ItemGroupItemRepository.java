package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.ItemGroupItem;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import com.smartdata.resto_console.dto.ItemGroupItemDTO;

@Repository
public interface ItemGroupItemRepository extends JpaRepository<ItemGroupItem, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateItemGroupItems")
    void updateItemGroupItems(@Param("p_item_grp_id") Integer item_grp_id, 
        @Param("p_item_id") Integer item_id, 
        @Param("p_addon_price") Double addon_price
    );

    @Procedure(name = "deleteItemGroupItems")
    void deleteItemGroupItem(@Param("p_item_grp_id") Integer item_grp_id
    );

    @Query(value = "SELECT i.id, i.item_grp_id, i.item_id, t.item_code, t.item_desc, i.addon_price FROM item_group_items i INNER JOIN item t ON i.item_id = t.item_id WHERE i.item_grp_id = :itemGrpId ORDER BY t.item_desc ASC", nativeQuery = true)
    List<ItemGroupItemDTO> findByItemGrpId(@Param("itemGrpId") Integer itemGrpId);    
}
