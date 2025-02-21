package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "storage_location")

// declare all your stored procs here, the parameters  **** CHANGE THIS *******************
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addStorageLocation",
        procedureName = "insert_storage_location",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_location_nm", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateStorageLocation",
        procedureName = "update_storage_location",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_location_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_location_nm", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteStorageLocation",
        procedureName = "delete_storage_location",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_location_id", type = Integer.class)
        }
    )
})

public class StorageLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id") // Map the station_id to id   
    private Integer locationId;   // correct 


    // ****** change ******

    @Column(name = "location_nm") // Map the snake_case column name
    private String locationNm;    

    // Getters and setters
}