package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "unit")

@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addUnit",
        procedureName = "insert_unit",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_unit_code", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_unit_desc", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateUnit",
        procedureName = "update_unit",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Long.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_unit_code", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_unit_desc", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteUnit",
        procedureName = "delete_unit",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Long.class)
        }
    )
})

public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String unit_code;

    private String unit_desc;

    // Getters and setters
}