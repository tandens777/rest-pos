package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "employee_type")

// declare all your stored procs here, the parameters  **** CHANGE THIS *******************

public class EmployeeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_type_id") 
    private Integer empTypeId;  



    // ****** change ******
    @Column(name = "emp_type_desc") // Map the snake_case column name
    private String empTypeDesc;    
    // Getters and setters
}