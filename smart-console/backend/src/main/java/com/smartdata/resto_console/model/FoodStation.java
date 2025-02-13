package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "food_station")

// declare all your stored procs here, the parameters  **** CHANGE THIS *******************
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addFoodStation",
        procedureName = "insert_food_station",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_nm", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateFoodStation",
        procedureName = "update_food_station",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_nm", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteFoodStation",
        procedureName = "delete_food_station",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_id", type = Integer.class)
        }
    )
})

public class FoodStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "station_id") // Map the station_id to id   
    private Integer stationId;   // correct 


    // ****** change ******

    @Column(name = "station_nm") // Map the snake_case column name
    private String stationNm;    

    // Getters and setters
}