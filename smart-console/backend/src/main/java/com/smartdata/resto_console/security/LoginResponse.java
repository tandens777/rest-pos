package com.smartdata.resto_console.security;

public class LoginResponse {
    private String username;
    private String role;
    private String token;

    public LoginResponse(String username, String role, String token) {
        this.username = username;
        this.role = role;
        this.token = token;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }
}