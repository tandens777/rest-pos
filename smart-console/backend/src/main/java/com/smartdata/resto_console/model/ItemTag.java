package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item_tag")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "addItemTag",
        procedureName = "insert_item_tag",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_tag_desc", type = String.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateItemTag",
        procedureName = "update_item_tag",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_tag_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_tag_desc", type = String.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteItemTag",
        procedureName = "delete_item_tag",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_tag_id", type = Integer.class)
        }
    )
})

public class ItemTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_tag_id") // Map the snake_case column name
    private Integer itemTagId;

    @Column(name = "item_tag_desc") // Map the snake_case column name
    private String itemTagDesc;

    // Getters and setters
}