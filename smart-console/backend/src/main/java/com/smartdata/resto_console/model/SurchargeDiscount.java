package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "surcharge_discount")

@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addSurchargeDiscount",
        procedureName = "insert_surcharge_discount",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_type", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_parent_disc_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_is_category", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_percentage", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_amt", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_picture_src", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_ref", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_short_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_auto_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_authorization", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_check_senior", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sm_discount_type", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pcnt_on_nv_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sort_order", type = Integer.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateSurchargeDiscount",
        procedureName = "update_surcharge_discount",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_desc", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_type", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_parent_disc_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_is_category", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_percentage", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_amt", type = Double.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_picture_src", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_ref", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_short_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_auto_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_need_authorization", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_check_senior", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sm_discount_type", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pcnt_on_nv_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sort_order", type = Integer.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteSurchargeDiscount",
        procedureName = "delete_surcharge_discount",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_disc_id", type = Integer.class)
        }
    )
})

public class SurchargeDiscount {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "disc_id")
    private Integer id;

    @Column(name = "disc_desc")
    private String discDesc;

    @Column(name = "disc_type")
    private String discType;

    @Column(name = "parent_disc_id")
    private Integer parentDiscId;

    @Column(name = "is_category")
    private String isCategory;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "amt")
    private Double amt;

    @Column(name = "picture_src")
    private String pictureSrc;

    @Column(name = "need_ref")
    private String needRef;

    @Column(name = "short_nm")
    private String shortNm;

    @Column(name = "auto_flag")
    private String autoFlag;

    @Column(name = "need_authorization")
    private String needAuthorization;

    @Column(name = "check_senior")
    private String checkSenior;

    @Column(name = "active_flag")
    private String activeFlag;

    @Column(name = "sm_discount_type")
    private Integer smDiscountType;

    @Column(name = "pcnt_on_nv_flag")
    private String pcntOnNvFlag;

    @Column(name = "sort_order") // Map the snake_case column name
    private Integer sortOrder;    
}
