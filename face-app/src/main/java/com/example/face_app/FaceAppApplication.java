package com.example.face_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.face_app"})
public class FaceAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(FaceAppApplication.class, args);
    }
}