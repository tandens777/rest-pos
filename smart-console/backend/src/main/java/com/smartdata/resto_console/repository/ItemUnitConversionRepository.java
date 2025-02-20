package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.ItemUnitConversion;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ItemUnitConversionRepository extends JpaRepository<ItemUnitConversion, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateItemUnitConversion")
    void updateItemUnitConversion(@Param("p_item_id") Integer item_id, 
        @Param("p_unit_code") String unit_code,
        @Param("p_conversion_to_default") Double conversion_to_default
    );

    @Procedure(name = "deleteItemUnitConversion")
    void deleteItemUnitConversion(@Param("p_item_id") Integer item_id, 
        @Param("p_unit_code") String unit_code
    );


    @Query(value = "SELECT i.* FROM item_unit_conversion i WHERE i.item_id = :itemId ORDER BY i.unit_code ASC", nativeQuery = true)
    List<ItemUnitConversion> findByItemId(@Param("itemId") Integer itemId);    
}
