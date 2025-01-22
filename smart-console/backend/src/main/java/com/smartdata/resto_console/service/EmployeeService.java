package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.EmployeeRepository;
import com.smartdata.resto_console.exception.EmployeeNotFoundException;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void insertEmployee(String name) {
        //System.out.println("Service Inserting employee with name: " + name);
        employeeRepository.insertEmployee(name);
    }

    @Transactional
    public void updateEmployee(Long id, String name) {
        employeeRepository.updateEmployee(id, name);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        employeeRepository.deleteEmployee(id);
    }

    public String getEmployeeName(Long id) {
        String name = employeeRepository.getEmployeeName(id);
        if (name == null) {
            throw new EmployeeNotFoundException("Employee not found with id: " + id);
        }
        return name;
    }
}