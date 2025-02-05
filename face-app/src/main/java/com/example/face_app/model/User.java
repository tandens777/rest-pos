package com.example.face_app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

//    @Column(columnDefinition = "float[]")
    private float[] facialFeatures; // Store facial feature vector
}
