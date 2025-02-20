package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.ItemUsage;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ItemUsageRepository extends JpaRepository<ItemUsage, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateItemUsage")
    void updateItemUsage(@Param("p_item_id") Integer item_id, 
        @Param("p_rm_item_id") Integer rm_item_id, 
        @Param("p_used_qty") Double used_qty,
        @Param("p_unit_code") String unit_code
    );

    @Query(value = "SELECT i.* FROM item_usage_setup i INNER JOIN item t ON i.rm_item_id = t.item_id WHERE i.item_id = :itemId ORDER BY t.item_desc ASC", nativeQuery = true)
    List<ItemUsage> findByItemId(@Param("itemId") Integer itemId);    
}
