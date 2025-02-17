package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item_group")

// declare all your stored procs here, the parameters  **** CHANGE THIS *******************
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addItemGroup",
        procedureName = "insert_item_group",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_grp_desc", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateItemGroup",
        procedureName = "update_item_group",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_grp_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_grp_desc", type = String.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteItemGroup",
        procedureName = "delete_item_group",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_grp_id", type = Integer.class)
        }
    )
})

public class ItemGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_grp_id") // Map the station_id to id   
    private Integer itemGrpId;   // correct 


    // ****** change ******

    @Column(name = "item_grp_desc") // Map the snake_case column name
    private String itemGrpDesc;    

    // Getters and setters
}