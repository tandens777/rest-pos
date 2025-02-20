package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "food_delivery_app_item_price")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "updateDeliveryAppItemPrice",
        procedureName = "update_delivery_app_item_price",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_add_pcnt", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_add_amt", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_price", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
        }
    ),    
})

public class DeliveryAppItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "app_id") // Map the snake_case column name
    private Integer appId;

    @Column(name = "item_id") // Map the snake_case column name
    private Integer itemId;

    @Column(name = "app_add_pcnt") // Map the snake_case column name
    private Double appAddPcnt;    

    @Column(name = "app_add_amt") // Map the snake_case column name
    private Double appAddAmt;    

    @Column(name = "app_price") // Map the snake_case column name
    private Double appPrice;    

    @Column(name = "active_flag") // Map the snake_case column name
    private String activeFlag;    

    // Getters and setters
}