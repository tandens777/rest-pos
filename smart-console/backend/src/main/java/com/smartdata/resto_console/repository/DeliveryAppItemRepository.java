package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.DeliveryAppItem;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface DeliveryAppItemRepository extends JpaRepository<DeliveryAppItem, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateDeliveryAppItemPrice")
    void updateDeliveryAppItemPrice(@Param("p_app_id") Integer app_id, 
        @Param("p_item_id") Integer item_id, 
        @Param("p_app_add_pcnt") Double app_add_pcnt, 
        @Param("p_app_add_amt") Double app_add_amt,
        @Param("p_app_price") Double app_price,
        @Param("p_active_flag") String active_flag
    );

    @Procedure(name = "deleteDeliveryAppItemPrice")
    void deleteDeliveryAppItemPrice(@Param("p_app_id") Integer app_id, 
        @Param("p_item_id") Integer item_id
    );

    @Query(value = "SELECT i.* FROM food_delivery_app_item_price i INNER JOIN food_delivery_app t ON i.app_id = t.app_id WHERE i.item_id = :itemId ORDER BY t.app_nm ASC", nativeQuery = true)
    List<DeliveryAppItem> findByItemId(@Param("itemId") Integer itemId);    
}
