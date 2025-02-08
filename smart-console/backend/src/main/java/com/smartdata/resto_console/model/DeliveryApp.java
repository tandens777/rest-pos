package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "food_delivery_app")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addDeliveryApp",
        procedureName = "insert_delivery_app",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_order_type", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_table_count", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pic_filename", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_add_pcnt", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_add_amt", type = Double.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateDeliveryApp",
        procedureName = "update_delivery_app",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_order_type", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_table_count", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pic_filename", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_add_pcnt", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_add_amt", type = Double.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteDeliveryApp",
        procedureName = "delete_delivery_app",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_app_id", type = Integer.class)
        }
    )
})

public class DeliveryApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "app_id") // Map the snake_case column name
    private Integer id;

    @Column(name = "app_nm") // Map the snake_case column name
    private String appNm;

    @Column(name = "order_type") // Map the snake_case column name
    private String orderType;    

    @Column(name = "active_flag") // Map the snake_case column name
    private String activeFlag;    

    @Column(name = "table_count") // Map the snake_case column name
    private Integer tableCount;    

    @Column(name = "pic_filename") // Map the snake_case column name
    private String picFilename;    

    @Column(name = "app_add_pcnt") // Map the snake_case column name
    private Double appAddPcnt;    

    @Column(name = "app_add_amt") // Map the snake_case column name
    private Double appAddAmt;    

    // Getters and setters
}