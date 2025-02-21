package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item_group_items")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "updateItemGroupItems",
        procedureName = "update_item_group_items",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_grp_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_addon_price", type = Double.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteItemGroupItems",
        procedureName = "delete_item_group_items",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_grp_id", type = Integer.class),
        }
    )
})

public class ItemGroupItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_grp_id") // Map the snake_case column name
    private Integer itemGrpId;

    @Column(name = "item_id") // Map the snake_case column name
    private Integer itemId;

    @Column(name = "addon_price") // Map the snake_case column name
    private Double addonPrice;

    // Getters and setters
}