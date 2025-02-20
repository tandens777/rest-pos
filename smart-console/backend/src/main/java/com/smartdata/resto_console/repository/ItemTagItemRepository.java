package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.ItemTagItem;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ItemTagItemRepository extends JpaRepository<ItemTagItem, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateItemTagItems")
    void updateItemTagItems(@Param("p_item_tag_id") Integer item_tag_id, 
        @Param("p_item_id") Integer item_id
    );

    @Query(value = "SELECT i.* FROM item_tag_items i INNER JOIN item_tag t ON i.item_tag_id = t.item_tag_id WHERE i.item_id = :itemId ORDER BY t.item_tag_desc ASC", nativeQuery = true)
    List<ItemTagItem> findByItemId(@Param("itemId") Integer itemId);    
}
