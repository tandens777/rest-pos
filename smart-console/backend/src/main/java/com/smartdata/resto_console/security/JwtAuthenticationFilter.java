package com.smartdata.resto_console.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.smartdata.resto_console.model.User;
import com.smartdata.resto_console.service.UserService;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserService userService;

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
        "/apidoc",
        "/uploads/**"
    };

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestURI = request.getRequestURI();
    
        // Skip filtering for whitelisted URLs
        for (String whiteListUrl : WHITE_LIST_URL) {
            if (requestURI.startsWith(whiteListUrl)) {
                filterChain.doFilter(request, response);
                return;
            }
        }
    
        // Proceed with JWT filtering for other URLs
        String token = extractJwtFromRequest(request);
    
        if (token != null && jwtUtil.validateToken(token, jwtUtil.extractUsername(token))) {
            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);
    
            User user = userService.findByUsername(username).orElse(null);
    
            if (user != null) {
                List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_" + role.toUpperCase())
                );
    
                // Create authentication token
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        user, null, authorities
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
    
        filterChain.doFilter(request, response);
    }        

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Remove "Bearer " prefix
        }
        return null;
    }
}
