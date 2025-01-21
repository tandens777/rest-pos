package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.model.User;
import com.smartdata.resto_console.security.JwtUtil;
import com.smartdata.resto_console.security.LoginRequest;
import com.smartdata.resto_console.security.LoginResponse;
import com.smartdata.resto_console.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.findByPinCode(loginRequest.getPinCode());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String role = user.getRole().getName();
            String token = jwtUtil.generateToken(user.getUsername(), role);
            return ResponseEntity.ok(new LoginResponse(user.getUsername(), role, token));
        }

        return ResponseEntity.status(401).body("Invalid PIN");
    }
}

