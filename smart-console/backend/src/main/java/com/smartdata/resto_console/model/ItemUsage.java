package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item_usage_setup")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "updateItemUsageSetup",
        procedureName = "update_item_usage_setup",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_rm_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_used_qty", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_unit_code", type = String.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteItemUsageSetup",
        procedureName = "delete_item_usage_setup",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_rm_item_id", type = Integer.class),
        }
    )
    
})

public class ItemUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_id") // Map the snake_case column name
    private Integer itemId;

    @Column(name = "rm_item_id") // Map the snake_case column name
    private Integer rmItemId;

    @Column(name = "used_qty") // Map the snake_case column name
    private Double usedQty;

    @Column(name = "unit_code") // Map the snake_case column name
    private String unitCode;

    // Getters and setters
}