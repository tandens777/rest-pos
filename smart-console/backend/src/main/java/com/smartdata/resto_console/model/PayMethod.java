package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "pay_method")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addPayMethod",
        procedureName = "insert_pay_method",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pay_mtd_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_parent_pay_mtd_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_is_category", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_picture_src", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_ref", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_expdt", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_short_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_bank_charges", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sm_pay_type", type = Integer.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updatePayMethod",
        procedureName = "update_pay_method",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pay_mtd_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pay_mtd_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_parent_pay_mtd_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_is_category", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_picture_src", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_ref", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_expdt", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_short_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_bank_charges", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sm_pay_type", type = Integer.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deletePayMethod",
        procedureName = "delete_pay_method",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pay_mtd_id", type = Integer.class)
        }
    )
})

public class PayMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_mtd_id") // Map the snake_case column name
    private Integer id;

    @Column(name = "pay_mtd_desc") // Map the snake_case column name
    private String payMtdDesc;

    @Column(name = "parent_pay_mtd_id") // Map the snake_case column name
    private Integer parentPayMtdId;    

    @Column(name = "is_category") // Map the snake_case column name
    private String isCategory;    

    @Column(name = "picture_src") // Map the snake_case column name
    private String pictureSrc;    

    @Column(name = "need_ref") // Map the snake_case column name
    private String needRef;    

    @Column(name = "need_expdt") // Map the snake_case column name
    private String needExpdt;    

    @Column(name = "short_nm") // Map the snake_case column name
    private String shortNm;    

    @Column(name = "active_flag") // Map the snake_case column name
    private String activeFlag;    

    @Column(name = "bank_charges") // Map the snake_case column name
    private Double bankCharges;    

    @Column(name = "sm_pay_type") // Map the snake_case column name
    private Integer smPayType;    

    // Getters and setters
}