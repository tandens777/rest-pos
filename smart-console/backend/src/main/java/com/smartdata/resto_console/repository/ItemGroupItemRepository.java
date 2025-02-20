package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.ItemGroupItem;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ItemGroupItemRepository extends JpaRepository<ItemGroupItem, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateItemGroupItems")
    void updateItemGroupItems(@Param("p_item_grp_id") Integer item_grp_id, 
        @Param("p_item_id") Integer item_id, 
        @Param("p_app_price") Double app_price
    );

    @Query(value = "SELECT i.* FROM item_group_items i INNER JOIN item t ON i.item_id = t.item_id WHERE i.item_grp_id = :itemGrpId ORDER BY t.item_desc ASC", nativeQuery = true)
    List<ItemGroupItem> findByItemGrpId(@Param("itemGrpId") Integer itemGrpId);    
}
