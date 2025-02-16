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
        @Param("p_item_code") String itemCode,
        @Param("p_item_desc") String itemDesc,
        @Param("p_short_nm") String shortNm,
        @Param("p_sort_order") Integer sortOrder,
        @Param("p_chinese_item_desc") String chineseItemDesc,
        @Param("p_cat_type_id") Integer catTypeId,
        @Param("p_parent_cat_id") Integer parentCatId,
        @Param("p_station_id") Integer stationId,
        @Param("p_per100g_flag") String per100gFlag,
        @Param("p_default_price") Double defaultPrice,
        @Param("p_addon_price") Double addonPrice,
        @Param("p_picture_src") String pictureSrc,
        @Param("p_default_unit_code") String defaultUnitCode,
        @Param("p_disc_exempt") String discExempt,
        @Param("p_allow_sc_on_exempt") String allowScOnExempt,
        @Param("p_non_vat_flag") String nonVatFlag,
        @Param("p_active_flag") String activeFlag,
        @Param("p_show_on_pos_flag") String showOnPosFlag,
        @Param("p_reorder_limit") Integer reorderLimit,
        @Param("p_track_invty_flag") String trackInvtyFlag,
        @Param("p_send_to_printer_flag") String sendToPrinterFlag,
        @Param("p_allow_dinein_flag") String allowDineinFlag,
        @Param("p_allow_pickup_flag") String allowPickupFlag,
        @Param("p_allow_delivery_flag") String allowDeliveryFlag,
        @Param("p_lastupduserid") String lastUpdatedUserId
    );

    // Stored procedure to update an Item
    @Procedure(name = "updateItem")
    void updateItem(
        @Param("p_item_id") Integer id,
        @Param("p_item_code") String itemCode,
        @Param("p_item_desc") String itemDesc,
        @Param("p_short_nm") String shortNm,
        @Param("p_sort_order") Integer sortOrder,
        @Param("p_chinese_item_desc") String chineseItemDesc,
        @Param("p_cat_type_id") Integer catTypeId,
        @Param("p_parent_cat_id") Integer parentCatId,
        @Param("p_station_id") Integer stationId,
        @Param("p_per100g_flag") String per100gFlag,
        @Param("p_default_price") Double defaultPrice,
        @Param("p_addon_price") Double addonPrice,
        @Param("p_picture_src") String pictureSrc,
        @Param("p_default_unit_code") String defaultUnitCode,
        @Param("p_disc_exempt") String discExempt,
        @Param("p_allow_sc_on_exempt") String allowScOnExempt,
        @Param("p_non_vat_flag") String nonVatFlag,
        @Param("p_active_flag") String activeFlag,
        @Param("p_show_on_pos_flag") String showOnPosFlag,
        @Param("p_reorder_limit") Integer reorderLimit,
        @Param("p_track_invty_flag") String trackInvtyFlag,
        @Param("p_send_to_printer_flag") String sendToPrinterFlag,
        @Param("p_allow_dinein_flag") String allowDineinFlag,
        @Param("p_allow_pickup_flag") String allowPickupFlag,
        @Param("p_allow_delivery_flag") String allowDeliveryFlag,
        @Param("p_lastupduserid") String lastUpdatedUserId
    );

    // Stored procedure to delete an Item
    @Procedure(name = "deleteItem")
    void deleteItem(@Param("p_item_id") Integer id);

    // Query to find Items by description, sorted by sortOrder and itemDesc
    @Query("SELECT i FROM Item i WHERE LOWER(i.itemDesc) LIKE LOWER(concat('%', :itemDesc, '%')) ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findByItemDescContainingIgnoreCaseOrderBySortOrder(@Param("itemDesc") String itemDesc);

    // Query to find Items by category type, sorted by sortOrder and itemDesc
    @Query("SELECT i FROM Item i WHERE i.catTypeId = :catTypeId ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findByCatTypeIdOrderBySortOrder(@Param("catTypeId") Integer catTypeId);

    // Query to find child Items by parent category ID
    @Query("SELECT i FROM Item i WHERE " +
       "(:parentCatId = 0 AND i.parentCatId IS NULL) " +
       "OR (:parentCatId > 0 AND i.parentCatId = :parentCatId) " +
       "ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findChildItems(@Param("parentCatId") Integer parentCatId);    

    // Query to retrieve all Items sorted by sortOrder and itemDesc
    @Query("SELECT i FROM Item i ORDER BY i.sortOrder ASC, i.itemDesc ASC")
    List<Item> findAllByOrderBySortOrder();
}
