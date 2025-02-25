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

// declare all your stored procs here, the parameters 
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

    @Column(name = "unit_code") // Map the snake_case column name
    private String unitCode;

    @Column(name = "unit_desc") // Map the snake_case column name
    private String unitDesc;    

    // Getters and setters
}