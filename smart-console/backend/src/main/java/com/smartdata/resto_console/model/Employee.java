package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data

@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "insertEmployee",
        procedureName = "insert_employee",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_name", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateEmployee",
        procedureName = "update_employee",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Long.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_name", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteEmployee",
        procedureName = "delete_employee",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Long.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "getEmployee",
        procedureName = "get_employee",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Long.class),
            @StoredProcedureParameter(mode = ParameterMode.OUT, name = "p_name", type = String.class)
        }
    )
})

@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Getters and setters
}