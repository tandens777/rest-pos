package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "employee_status")

// declare all your stored procs here, the parameters  **** CHANGE THIS *******************

public class EmployeeStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_status_id") 
    private Integer empStatusId;  



    // ****** change ******
    @Column(name = "emp_status_desc") // Map the snake_case column name
    private String empStatusDesc;    
    // Getters and setters
}