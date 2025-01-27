package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "table_picture")

// declare all your stored procs here, the parameters  **** CHANGE THIS *******************

public class TablePicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Map the station_id to id   
    private Integer id;   // correct 



    // ****** change ******
    @Column(name = "filename") // Map the snake_case column name
    private String filename;    
    // Getters and setters
}