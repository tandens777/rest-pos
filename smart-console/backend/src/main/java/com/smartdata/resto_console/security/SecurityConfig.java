package com.smartdata.resto_console.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private static final String[] WHITE_LIST_URL = {
        "/api/auth/**", // Allow all auth endpoints
        "/v2/api-docs", 
        "/v3/api-docs", 
        "/v3/api-docs/swagger-config", // Allow Swagger config endpoint
        "/swagger-resources/**", 
        "/swagger-ui/**", // Allow Swagger UI
        "/swagger-ui.html", // Allow Swagger UI HTML page
        "/webjars/**", 
        "/api/test/**",
        "/apidoc"
    };

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(WHITE_LIST_URL).permitAll() // Permit whitelisted URLs
                .requestMatchers("/api/employees/name/**").hasAnyRole("CASHIER", "ADMIN") // Role-specific endpoints
                .requestMatchers("/api/employees/**").hasRole("ADMIN") // Restricted to ADMIN
                .anyRequest().authenticated() // All other endpoints require authentication
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter

        return http.build();
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Allow all endpoints
                        .allowedOrigins("http://localhost:3000") // Allow requests from your React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // Allow credentials (e.g., cookies, authorization headers)
            }
        };
    }    
}
