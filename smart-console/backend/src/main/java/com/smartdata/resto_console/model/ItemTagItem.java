package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "item_tag_items")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "updateItemTagItems",
        procedureName = "update_item_tag_items",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_tag_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteItemTagItem",
        procedureName = "delete_item_tag_item",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_tag_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_item_id", type = Integer.class),
        }
    )
})

public class ItemTagItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_tag_id") // Map the snake_case column name
    private Integer itemTagId;

    @Column(name = "item_id") // Map the snake_case column name
    private Integer itemId;

    // Getters and setters
}