package com.example.face_app.controller;

import com.example.face_app.model.User;
import com.example.face_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) { // Accepts JSON request body
        User registeredUser = userService.registerUser(user.getUsername(), user.getPassword(), user.getFacialFeatures());
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) { // Accept JSON request body
        return userService.authenticateUser(user.getFacialFeatures())
                .map(u -> ResponseEntity.ok(u.getUsername()))
//                .map(u -> ResponseEntity.ok("Login successful"))
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }

    
}