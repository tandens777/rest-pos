package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")  // Renamed table to avoid conflict with PostgreSQL 'user' table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)  // Ensure username is unique and not null
    private String username;

    @Column(nullable = false)  // Ensure password is not null
    private String password;

    private String facialFeatures; // Store facial feature vector

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "role_id", nullable = false)  // Foreign key to Role table
    private Role role;

    // Getter and Setter for Role
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @JsonIgnore
    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Convert JSON string to float[]
    @JsonIgnore
    public float[] getFacialFeaturesAsArray() {
        try {
            return objectMapper.readValue(facialFeatures, float[].class);
        } catch (JsonProcessingException e) {
            return new float[0]; // Handle conversion error
        }
    }

    // Convert float[] to JSON string before storing
    @JsonIgnore
    public void setFacialFeaturesFromArray(float[] features) {
        try {
            this.facialFeatures = objectMapper.writeValueAsString(features);
        } catch (JsonProcessingException e) {
            this.facialFeatures = "[]"; // Handle error
        }
    }

}
