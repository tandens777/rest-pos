package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item_unit_conversion")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "updateItemUnitConversion",
        procedureName = "update_item_unit_conversion",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_unit_code", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_conversion_to_default", type = Double.class),
        }
    ),

    @NamedStoredProcedureQuery(
        name = "deleteItemUnitConversion",
        procedureName = "delete_item_unit_conversion",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_unit_code", type = String.class),
        }
    )

})

public class ItemUnitConversion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_id") // Map the snake_case column name
    private Integer itemId;

    @Column(name = "unit_code") // Map the snake_case column name
    private String unitCode;

    @Column(name = "conversion_to_default") // Map the snake_case column name
    private Double conversionToDefault;


    // Getters and setters
}