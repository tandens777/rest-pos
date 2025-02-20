package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.ItemSetMenu;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ItemSetMenuRepository extends JpaRepository<ItemSetMenu, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateItemSetMenu")
    void updateItemSetMenu(@Param("p_set_item_id") Integer set_item_id, 
        @Param("p_set_dtl_id") Integer set_dtl_id, 
        @Param("p_menu_item_grp_id") Integer menu_item_grp_id, 
        @Param("p_menu_item_id") Integer menu_item_id, 
        @Param("p_qty") Double qty,
        @Param("p_set_addon_price") Double set_addon_price,
        @Param("p_sort_order") Integer sort_order
    );

    @Query(value = "SELECT i.* FROM item_set_menu i WHERE i.set_item_id = :itemId ORDER BY i.sort_order ASC, i.set_dtl_id ASC", nativeQuery = true)
    List<ItemSetMenu> findByItemId(@Param("itemId") Integer itemId);    
}
