package com.smartdata.resto_console.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smartdata.resto_console.dto.*;
import com.smartdata.resto_console.model.User;
import com.smartdata.resto_console.model.Employee;
import com.smartdata.resto_console.security.JwtUtil;
import com.smartdata.resto_console.security.LoginRequest;
import com.smartdata.resto_console.security.LoginResponse;
import com.smartdata.resto_console.service.UserService;
import com.smartdata.resto_console.service.EmployeeService;

import java.util.Optional;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.findByPinCode(loginRequest.getPinCode());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String role = user.getRole().getName();
            
            Optional<Employee> employeeOptional = employeeService.getEmployee(user.getId());
            if (employeeOptional.isPresent()) {
                Employee employee = employeeOptional.get(); // Extract the Employee object
                if (employee == null){
                    return ResponseEntity.status(401).body("Employee not found");        
                }    
                // Check if the employee is active
                if (!"Y".equals(employee.getActiveFlag())) {
                    return ResponseEntity.status(401).body("Unauthorized access");
                }
            }            

            String token = jwtUtil.generateToken(user.getUsername(), role);
            return ResponseEntity.ok(new LoginResponse(user.getUsername(), role, token));
        }

        return ResponseEntity.status(401).body("Invalid PIN");
    }

    @PostMapping("/face_login")
    public ResponseEntity<?> login(@RequestBody FacialFeaturesDTO loginRequest) {
        
//        System.out.println("FACE LOGIN REQUEST: " + loginRequest.getFacialFeatures());
        double[] loginFacialFeatures = loginRequest.getFacialFeaturesAsArray();
//        System.out.println("FACE LOGIN REQUEST ARRAY: " + Arrays.toString(loginFacialFeatures));

        if (loginRequest.getFacialFeatures() == null || loginFacialFeatures.length == 0) {
            return ResponseEntity.status(401).body("NO FACE DETECTED.");
        }

        // search from employee records and match face, skip if null
        List<Employee> employees;
        Long id = null;

        UserService svc = new UserService();    
        employees = employeeService.getEmployees(null); // Check all employees
    
        for (Employee employee : employees) {
            double[] existingFacialFeatures = employee.getFacialFeaturesAsArray();
    
            // Skip comparison if existing facial features are null
            if (existingFacialFeatures == null) {
                continue; // Skip this employee, as they have no stored facial features
            }
    
            if (svc.compareFacialFeatures(loginFacialFeatures, existingFacialFeatures)) {
                System.out.println("❌ Face Matched for User: " + employee.getUsername());
                id = employee.getId(); // Face already exists
                // Check if the employee is active
                if (!"Y".equals(employee.getActiveFlag())) {
                    return ResponseEntity.status(401).body("Unauthorized access");
                }
            }
        }
  
        if (id == null) {
            return ResponseEntity.status(401).body("Face not recognized.");
        }

        Optional<User> userOptional = userService.getUser(id);

        if (userOptional.isPresent()) {
//            System.out.println("FOUND FACE: ");

            User user = userOptional.get();
            String role = user.getRole().getName();

            String token = jwtUtil.generateToken(user.getUsername(), role);
            return ResponseEntity.ok(new LoginResponse(user.getUsername(), role, token));
        }

        return ResponseEntity.status(401).body("Face not recognized.");
    }

}

