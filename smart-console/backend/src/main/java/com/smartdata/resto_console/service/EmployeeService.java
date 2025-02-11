package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.*;

import com.smartdata.resto_console.repository.EmployeeRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;

import com.smartdata.resto_console.model.Employee;
import com.smartdata.resto_console.dto.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.sql.Array;
import java.sql.Connection;
import java.util.Arrays;


@Service
public class EmployeeService {

    @PersistenceContext
    private EntityManager entityManager;  // Inject EntityManager

    @Autowired
    private EmployeeRepository employeeRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public void addEmployee(
        String emp_no, String last_nm, String first_nm, String gender, Integer station_id,
        String tin_no, String sss_no, LocalDate bday, String phone_no, LocalDate date_hired,
        LocalDate date_end, String remarks, 
        String facial_features, 
        String public_key, String console_flag,
        String drawer_flag, String active_flag, String pic_filename, 

        String address, String email, Integer emp_type_id, Integer emp_status_id, 
        String password, String username, Long role_id, 

        String mon_restday, LocalTime mon_start1, LocalTime mon_end1,
        LocalTime mon_start2, LocalTime mon_end2, 
        LocalTime mon_start3, LocalTime mon_end3,
        String tue_restday, LocalTime tue_start1, LocalTime tue_end1, 
        LocalTime tue_start2, LocalTime tue_end2,
        LocalTime tue_start3, LocalTime tue_end3, 
        String wed_restday, LocalTime wed_start1, LocalTime wed_end1,
        LocalTime wed_start2, LocalTime wed_end2, 
        LocalTime wed_start3, LocalTime wed_end3,
        String thu_restday, LocalTime thu_start1, LocalTime thu_end1, 
        LocalTime thu_start2, LocalTime thu_end2,
        LocalTime thu_start3, LocalTime thu_end3, 
        String fri_restday, LocalTime fri_start1, LocalTime fri_end1,
        LocalTime fri_start2, LocalTime fri_end2, 
        LocalTime fri_start3, LocalTime fri_end3,
        String sat_restday, LocalTime sat_start1, LocalTime sat_end1, 
        LocalTime sat_start2, LocalTime sat_end2,
        LocalTime sat_start3, LocalTime sat_end3, 
        String sun_restday, LocalTime sun_start1, LocalTime sun_end1,
        LocalTime sun_start2, LocalTime sun_end2, 
        LocalTime sun_start3, LocalTime sun_end3
    ) {
        try{
            // Check for uniqueness of PIN
            if (!isPinUnique(password, null)) {
                throw new GenericNotFoundException("PIN code already in use. Please choose another.");
            }

            FacialFeaturesDTO faceDTO = new FacialFeaturesDTO();
            faceDTO.setFacialFeatures(facial_features);
            double[] facialFeaturesArray = faceDTO.getFacialFeaturesAsArray();

            // Check for uniqueness of Face
             if (!isFaceUnique(facialFeaturesArray, null)) {
                throw new GenericNotFoundException("Face already registered with another user. Please choose another.");
            }
            
            String hashedPassword = passwordEncoder.encode(password);

            employeeRepository.insertEmployee(
                emp_no, last_nm, first_nm, gender, station_id, tin_no, sss_no, bday, phone_no,
                date_hired, date_end, remarks, facial_features, public_key, console_flag, drawer_flag,
                active_flag, pic_filename, 
                address, email, emp_type_id, emp_status_id, hashedPassword, username, role_id,
                mon_restday, mon_start1, mon_end1, mon_start2, mon_end2, mon_start3, mon_end3, 
                tue_restday, tue_start1, tue_end1, tue_start2, tue_end2, tue_start3, tue_end3, 
                wed_restday, wed_start1, wed_end1, wed_start2, wed_end2, wed_start3, wed_end3, 
                thu_restday, thu_start1, thu_end1, thu_start2, thu_end2, thu_start3, thu_end3, 
                fri_restday, fri_start1, fri_end1, fri_start2, fri_end2, fri_start3, fri_end3, 
                sat_restday, sat_start1, sat_end1, sat_start2, sat_end2, sat_start3, sat_end3, 
                sun_restday, sun_start1, sun_end1, sun_start2, sun_end2, sun_start3, sun_end3
            );
        } catch (DataIntegrityViolationException e) {
            throw new GenericNotFoundException("Record has duplicate fields. Please check Employee No, Username, FirstName and LastName, or Password PIN.");
        } catch (GenericNotFoundException e) {
            throw new GenericNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new GenericNotFoundException("An unexpected error occurred while updating the employee.");
        }                    
    }

    @Transactional
    public void updateEmployee(
        Long id, String emp_no, String last_nm, String first_nm, String gender, Integer station_id,
        String tin_no, String sss_no, LocalDate bday, String phone_no, LocalDate date_hired,
        LocalDate date_end, String remarks, 
        String facial_features,
        String public_key, String console_flag,
        String drawer_flag, String active_flag, String pic_filename, 
        
        String address, String email, Integer emp_type_id, Integer emp_status_id, 
        String password, String username, Long role_id, 

        String mon_restday, LocalTime mon_start1, LocalTime mon_end1,
        LocalTime mon_start2, LocalTime mon_end2, 
        LocalTime mon_start3, LocalTime mon_end3,
        String tue_restday, LocalTime tue_start1, LocalTime tue_end1, 
        LocalTime tue_start2, LocalTime tue_end2,
        LocalTime tue_start3, LocalTime tue_end3, 
        String wed_restday, LocalTime wed_start1, LocalTime wed_end1,
        LocalTime wed_start2, LocalTime wed_end2, 
        LocalTime wed_start3, LocalTime wed_end3,
        String thu_restday, LocalTime thu_start1, LocalTime thu_end1, 
        LocalTime thu_start2, LocalTime thu_end2,
        LocalTime thu_start3, LocalTime thu_end3, 
        String fri_restday, LocalTime fri_start1, LocalTime fri_end1,
        LocalTime fri_start2, LocalTime fri_end2, 
        LocalTime fri_start3, LocalTime fri_end3,
        String sat_restday, LocalTime sat_start1, LocalTime sat_end1, 
        LocalTime sat_start2, LocalTime sat_end2,
        LocalTime sat_start3, LocalTime sat_end3, 
        String sun_restday, LocalTime sun_start1, LocalTime sun_end1,
        LocalTime sun_start2, LocalTime sun_end2, 
        LocalTime sun_start3, LocalTime sun_end3
    ) {
        try{
            String hashedPassword = "";
            String oldStoredPassword = "";
            String oldUsername = "";

            Optional<Employee> employeeOptional = employeeRepository.findById(id);

            if (employeeOptional.isPresent()) {
                Employee employee = employeeOptional.get(); // Extract the Employee object
                oldStoredPassword = employee.getPassword();
                oldUsername = employee.getUsername();
                System.out.println("UPDATE EMPLOYEE:  oldUserName:" + oldUsername + "  oldStoredPassword:" + oldStoredPassword);
            }

            boolean isMatch = password.length() > 6;
            if (!isMatch){
                // Check for uniqueness of PIN
                if (!isPinUnique(password, oldUsername)) {
                    throw new GenericNotFoundException("PIN code already in use. Please choose another.");
                }
                
                hashedPassword = passwordEncoder.encode(password);
            } else {
                hashedPassword = oldStoredPassword;
            }

            FacialFeaturesDTO faceDTO = new FacialFeaturesDTO();
            faceDTO.setFacialFeatures(facial_features);
            double[] facialFeaturesArray = faceDTO.getFacialFeaturesAsArray();

            System.out.println("FACIAL ARRAY: " + Arrays.toString(facialFeaturesArray));

             // Check for uniqueness of Face
             if (!isFaceUnique(facialFeaturesArray, oldUsername)) {
                throw new GenericNotFoundException("Face already registered with another user. Please choose another.");
            }

            employeeRepository.updateEmployee(
                id, emp_no, last_nm, first_nm, gender, station_id, tin_no, sss_no, bday, phone_no,
                date_hired, date_end, remarks, facial_features, public_key, console_flag, drawer_flag,
                active_flag, pic_filename, 
                address, email, emp_type_id, emp_status_id, hashedPassword, username, role_id,
                mon_restday, mon_start1, mon_end1, mon_start2, mon_end2, mon_start3, mon_end3, 
                tue_restday, tue_start1, tue_end1, tue_start2, tue_end2, tue_start3, tue_end3, 
                wed_restday, wed_start1, wed_end1, wed_start2, wed_end2, wed_start3, wed_end3, 
                thu_restday, thu_start1, thu_end1, thu_start2, thu_end2, thu_start3, thu_end3, 
                fri_restday, fri_start1, fri_end1, fri_start2, fri_end2, fri_start3, fri_end3, 
                sat_restday, sat_start1, sat_end1, sat_start2, sat_end2, sat_start3, sat_end3, 
                sun_restday, sun_start1, sun_end1, sun_start2, sun_end2, sun_start3, sun_end3
            );
        } catch (DataIntegrityViolationException e) {
            throw new GenericNotFoundException("Record has duplicate fields. Please check Employee No, Username, FirstName and LastName, or Password PIN." + e.getMessage());
        } catch (GenericNotFoundException e) {
            throw new GenericNotFoundException(e.getMessage());
        } catch (Exception e) {
            throw new GenericNotFoundException("An unexpected error occurred while updating the employee." + e.getMessage());
        }            
    }

    @Transactional
    public void deleteEmployee(Long id) {
        employeeRepository.deleteEmployee(id);
    }

    public Optional<Employee> getEmployee(Long id) throws GenericNotFoundException {
        Optional<Employee> employee = employeeRepository.findById(id);

        if (employee.isPresent()) {
            return employee;
        } else {
            throw new GenericNotFoundException("Employee not found with id: " + id);
        }
    }

    public List<Employee> getEmployees(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            // If searchTerm is empty, return all employees ordered by ID
            return employeeRepository.findAllByOrderByName();
        }

        // Split the searchTerm into individual words
        String[] searchWords = searchTerm.trim().split("\\s+");

        // Create a stream of employees and filter based on the search words
        return employeeRepository.findAllByOrderByName().stream()
                .filter(employee -> matchesSearchTerm(employee, searchWords))
                .collect(Collectors.toList());
    }

    private boolean matchesSearchTerm(Employee employee, String[] searchWords) {
        // Check if any of the search words match the firstNm or lastNm (case-insensitive)
        for (String word : searchWords) {
            if (employee.getFirstNm().toLowerCase().contains(word.toLowerCase()) ||
                employee.getLastNm().toLowerCase().contains(word.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    public boolean isPinUnique(String rawPin, String skip_username) { 
        List<Employee> employees;
    
        if (skip_username != null) {
            employees = employeeRepository.findByUsernameNot(skip_username);
        } else {
            employees = employeeRepository.findAll(); // Check all employees
        }
    
        for (Employee employee : employees) {
            System.out.println("ID: " + employee.getId() + 
                           ", Username: " + employee.getUsername() +
                           ", Hashed Password: " + employee.getPassword());

            if (passwordEncoder.matches(rawPin, employee.getPassword())) {
                System.out.println("❌ PIN Matched for User: " + employee.getUsername());
                return false; // PIN already exists
            }
        }
        return true; // Unique PIN
    }

    
    public boolean isFaceUnique(double[] newFacialFeatures, String skip_username) { 
        List<Employee> employees;
    
        UserService svc = new UserService();
    
        if (skip_username != null) {
            employees = employeeRepository.findByUsernameNot(skip_username);
        } else {
            employees = employeeRepository.findAll(); // Check all employees
        }
    
        // Skip comparison if newFacialFeatures is null
        if (newFacialFeatures == null) {
            return true; // No face features provided, assume unique
        }
    
        for (Employee employee : employees) {
            double[] existingFacialFeatures = employee.getFacialFeaturesAsArray();
    
            // Skip comparison if existing facial features are null
            if (existingFacialFeatures == null) {
                continue; // Skip this employee, as they have no stored facial features
            }
    
            if (svc.compareFacialFeatures(newFacialFeatures, existingFacialFeatures)) {
                System.out.println("❌ Face Matched for User: " + employee.getUsername());
                return false; // Face already exists
            }
        }
    
        return true; // Unique Face
    }

    @Transactional
    public void changePIN(String username, String old_password, String new_password) throws GenericNotFoundException {
        Optional<Employee> employeeOptional = employeeRepository.findByUsername(username);

        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get(); // Extract the Employee object
    
            String oldStoredPassword = employee.getPassword();

            System.out.println("Entered old Password  " + old_password);
            System.out.println("StoredOldPassword  " + oldStoredPassword);
                
            // Verify old password before hashing the new password
            if (!passwordEncoder.matches(old_password, oldStoredPassword)) {
                throw new GenericNotFoundException("Employee [" + username + "] has entered an invalid password.");    
            }
    
            // Check for uniqueness of PIN
            if (!isPinUnique(new_password, username)) {
                throw new GenericNotFoundException("PIN code already in use. Please choose another.");
            }

            // Hashing the password before storing in DB
            String hashedNewPassword = passwordEncoder.encode(new_password);

            // Call stored procedure to update the password
            employeeRepository.changePIN(username, hashedNewPassword);
        } else {
            throw new GenericNotFoundException("Employee [" + username + "] not found.");               
        }
    }


}