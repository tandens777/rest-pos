package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "floor")

// declare all your stored procs here, the parameters  **** CHANGE THIS *******************
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addFloor",
        procedureName = "insert_floor",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_name", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateFloor",
        procedureName = "update_floor",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_name", type = String.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteFloor",
        procedureName = "delete_floor",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Integer.class)
        }
    )
})

public class Floor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Map the station_id to id   
    private Integer id;   // correct 



    // ****** change ******
    @Column(name = "name") // Map the snake_case column name
    private String name;    
    // Getters and setters
}