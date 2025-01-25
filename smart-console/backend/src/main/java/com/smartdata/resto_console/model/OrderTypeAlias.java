package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "order_type_aliases")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "generateOrderTypeAlias",
        procedureName = "gen_order_type_aliases",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_order_type", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_skip_nums", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_start_num", type = Integer.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateOrderTypeAlias",
        procedureName = "update_order_type_alias",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_order_type", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tbl_num", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tbl_name", type = String.class)
        }
    )
})

public class OrderTypeAlias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_type", nullable = false)
    private String orderType;

    @Column(name = "tbl_num", nullable = false)
    private Integer tblNum;

    @Column(name = "tbl_name", nullable = false)
    private String tblName;

    // Getters and setters
}