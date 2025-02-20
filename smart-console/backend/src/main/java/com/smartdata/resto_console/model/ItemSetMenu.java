package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item_set_menu")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "updateItemSetMenu",
        procedureName = "update_item_set_menu",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_set_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_set_dtl_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_menu_item_grp_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_menu_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_qty", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_set_addon_price", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sort_order", type = Integer.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteItemSetMenu",
        procedureName = "delete_item_set_menu",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_set_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_set_dtl_id", type = Integer.class),
        }
    )

})

public class ItemSetMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "set_item_id") // Map the snake_case column name
    private Integer setItemId;

    @Column(name = "set_dtl_id") // Map the snake_case column name
    private Integer setDtlId;

    @Column(name = "menu_item_grp_id") // Map the snake_case column name
    private Integer menuItemGrpId;

    @Column(name = "menu_item_id") // Map the snake_case column name
    private Integer menuItemId;

    @Column(name = "qty") // Map the snake_case column name
    private Double qty;

    @Column(name = "set_addon_price") // Map the snake_case column name
    private Double setAddonPrice;

    @Column(name = "sort_order") // Map the snake_case column name
    private Integer sortOrder;

    // Getters and setters
}