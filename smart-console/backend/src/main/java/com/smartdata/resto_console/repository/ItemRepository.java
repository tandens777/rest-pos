package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.Item;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    // Stored procedure to add an Item
    @Procedure(name = "insertItem")
    void insertItem(
        @Param("p_item_code") String item_code,
        @Param("p_item_desc") String item_desc,
        @Param("p_short_nm") String short_nm,
        @Param("p_sort_order") Integer sort_order,
        @Param("p_chinese_item_desc") String chinese_item_desc,
        @Param("p_cat_type_id") Integer cat_type_id,
        @Param("p_parent_cat_id") Integer parent_cat_id,
        @Param("p_is_category") String is_category, 
        @Param("p_station_id") Integer station_id,
        @Param("p_per100g_flag") String per100g_flag,
        @Param("p_default_price") Double default_price,
        @Param("p_addon_price") Double addon_price,
        @Param("p_picture_src") String picture_src,
        @Param("p_default_unit_code") String default_unit_code,
        @Param("p_disc_exempt") String disc_exempt,
        @Param("p_allow_sc_on_exempt") String allow_sc_on_exempt,
        @Param("p_non_vat_flag") String non_vat_flag,
        @Param("p_active_flag") String active_flag,
        @Param("p_show_on_pos_flag") String show_on_pos_flag,
        @Param("p_reorder_limit") Integer reorder_limit,
        @Param("p_track_invty_flag") String track_invty_flag,
        @Param("p_send_to_printer_flag") String send_to_printer_flag,
        @Param("p_allow_dinein_flag") String allow_dinein_flag,
        @Param("p_allow_pickup_flag") String allow_pickup_flag,
        @Param("p_allow_delivery_flag") String allow_delivery_flag,
        @Param("p_soldout_flag") String soldout_flag,
        @Param("p_lastupduserid") String lastupduserid
    );
    
    // Stored procedure to update an Item
    @Procedure(name = "updateItem")
    void updateItem(
        @Param("p_item_id") Integer id,
        @Param("p_item_code") String item_code,
        @Param("p_item_desc") String item_desc,
        @Param("p_short_nm") String short_nm,
        @Param("p_sort_order") Integer sort_order,
        @Param("p_chinese_item_desc") String chinese_item_desc,
        @Param("p_cat_type_id") Integer cat_type_id,
        @Param("p_parent_cat_id") Integer parent_cat_id,
        @Param("p_is_category") String is_category,         
        @Param("p_station_id") Integer station_id,
        @Param("p_per100g_flag") String per100g_flag,
        @Param("p_default_price") Double default_price,
        @Param("p_addon_price") Double addon_price,
        @Param("p_picture_src") String picture_src,
        @Param("p_default_unit_code") String default_unit_code,
        @Param("p_disc_exempt") String disc_exempt,
        @Param("p_allow_sc_on_exempt") String allow_sc_on_exempt,
        @Param("p_non_vat_flag") String non_vat_flag,
        @Param("p_active_flag") String active_flag,
        @Param("p_show_on_pos_flag") String show_on_pos_flag,
        @Param("p_reorder_limit") Integer reorder_limit,
        @Param("p_track_invty_flag") String track_invty_flag,
        @Param("p_send_to_printer_flag") String send_to_printer_flag,
        @Param("p_allow_dinein_flag") String allow_dinein_flag,
        @Param("p_allow_pickup_flag") String allow_pickup_flag,
        @Param("p_allow_delivery_flag") String allow_delivery_flag,
        @Param("p_soldout_flag") String soldout_flag,
        @Param("p_lastupduserid") String lastupduserid
    );
    
    // Stored procedure to delete an Item
    @Procedure(name = "deleteItem")
    void deleteItem(@Param("p_item_id") Integer id);

    // Query to find Items by description, sorted by sortOrder and itemDesc
    @Query("SELECT i FROM Item i WHERE catTypeId = :catTypeId and (LOWER(i.itemDesc) LIKE LOWER(concat('%', :itemDesc, '%')) or LOWER(i.itemCode) LIKE LOWER(concat('%', :itemDesc, '%'))) ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findByItemDescContainingIgnoreCaseOrderBySortOrder(@Param("catTypeId") Integer catTypeId, @Param("itemDesc") String itemDesc);

    // Query to find Items by category type, sorted by sortOrder and itemDesc
    @Query("SELECT i FROM Item i WHERE catTypeId = :catTypeId and LOWER(i.isCategory) LIKE LOWER(concat('%', :isCategory, '%')) ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findByIsCategoryContainingIgnoreCaseOrderBySortOrder(@Param("catTypeId") Integer catTypeId, @Param("isCategory") String isCategory);

    // Query to find child Items by parent category ID
    @Query("SELECT i FROM Item i WHERE catTypeId = :catTypeId and " +
       "(:parentCatId = 0 AND i.parentCatId IS NULL) " +
       "OR (:parentCatId > 0 AND i.parentCatId = :parentCatId) " +
       "ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findChildItems(@Param("catTypeId") Integer catTypeId, @Param("parentCatId") Integer parentCatId);    

    // Query to retrieve all Items sorted by sortOrder and itemDesc
    @Query("SELECT i FROM Item i WHERE catTypeId = :catTypeId ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findAllByOrderBySortOrder(@Param("catTypeId") Integer catTypeId);


    // Query to find Items by description, sorted by sortOrder and itemDesc
    @Query(value = "SELECT i.* FROM item i INNER JOIN item_tag_items t ON i.item_id = t.item_id WHERE t.item_tag_id = :itemTagId AND i.cat_type_id = :catTypeId AND (LOWER(i.item_desc) LIKE LOWER(CONCAT('%', :itemDesc, '%')) OR LOWER(i.item_code) LIKE LOWER(CONCAT('%', :itemDesc, '%'))) ORDER BY i.sort_order ASC, i.item_desc ASC", nativeQuery = true)
    List<Item> findByTagItemDescContainingIgnoreCaseOrderBySortOrder(@Param("itemTagId") Integer itemTagId, @Param("catTypeId") Integer catTypeId, @Param("itemDesc") String itemDesc);

    // Query to retrieve all Items sorted by sortOrder and itemDesc
    @Query(value = "SELECT i.* FROM item i INNER JOIN item_tag_items t ON i.item_id = t.item_id WHERE t.item_tag_id = :itemTagId AND i.cat_type_id = :catTypeId  ORDER BY i.sort_order ASC, i.item_desc ASC", nativeQuery = true)
    List<Item> findAllTagByOrderBySortOrder(@Param("itemTagId") Integer itemTagId, @Param("catTypeId") Integer catTypeId);

}
