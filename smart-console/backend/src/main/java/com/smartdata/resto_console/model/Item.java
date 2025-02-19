package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item")

@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "insertItem",
        procedureName = "insert_item",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_code", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_short_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sort_order", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_chinese_item_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_cat_type_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_parent_cat_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_is_category", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_per100g_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_default_price", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_addon_price", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_picture_src", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_default_unit_code", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_exempt", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_sc_on_exempt", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_non_vat_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_show_on_pos_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_reorder_limit", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_track_invty_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_send_to_printer_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_dinein_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_pickup_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_delivery_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_soldout_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_lastupduserid", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateItem",
        procedureName = "update_item",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_code", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_short_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sort_order", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_chinese_item_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_cat_type_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_parent_cat_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_is_category", type = String.class),            
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_per100g_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_default_price", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_addon_price", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_picture_src", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_default_unit_code", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_exempt", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_sc_on_exempt", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_non_vat_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_show_on_pos_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_reorder_limit", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_track_invty_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_send_to_printer_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_dinein_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_pickup_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_allow_delivery_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_soldout_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_lastupduserid", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteItem",
        procedureName = "delete_item",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class)
        }
    )
})
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    private Integer id;

    @Column(name = "item_code")
    private String itemCode;

    @Column(name = "item_desc")
    private String itemDesc;

    @Column(name = "short_nm")
    private String shortNm;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Column(name = "chinese_item_desc")
    private String chineseItemDesc;

    @Column(name = "cat_type_id")
    private Integer catTypeId;

    @Column(name = "parent_cat_id")
    private Integer parentCatId;

    @Column(name = "is_category") 
    private String isCategory;  

    @Column(name = "station_id")
    private Integer stationId;

    @Column(name = "per100g_flag")
    private String per100gFlag;

    @Column(name = "default_price")
    private Double defaultPrice;

    @Column(name = "addon_price")
    private Double addonPrice;

    @Column(name = "picture_src")
    private String pictureSrc;

    @Column(name = "default_unit_code")
    private String defaultUnitCode;

    @Column(name = "disc_exempt")
    private String discExempt;

    @Column(name = "allow_sc_on_exempt")
    private String allowScOnExempt;

    @Column(name = "non_vat_flag")
    private String nonVatFlag;

    @Column(name = "active_flag")
    private String activeFlag;

    @Column(name = "show_on_pos_flag")
    private String showOnPosFlag;

    @Column(name = "reorder_limit")
    private Integer reorderLimit;

    @Column(name = "track_invty_flag")
    private String trackInvtyFlag;

    @Column(name = "send_to_printer_flag")
    private String sendToPrinterFlag;

    @Column(name = "allow_dinein_flag")
    private String allowDineinFlag;

    @Column(name = "allow_pickup_flag")
    private String allowPickupFlag;

    @Column(name = "allow_delivery_flag")
    private String allowDeliveryFlag;

    @Column(name = "soldout_flag")
    private String soldoutFlag;

    @Column(name = "lastupduserid")
    private String lastupduserid;

    @Column(name = "lastupddt")
    private LocalDateTime lastupddt;
}