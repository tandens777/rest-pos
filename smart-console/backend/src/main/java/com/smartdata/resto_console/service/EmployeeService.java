package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void createEmployee(String name) {
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
        return employeeRepository.getEmployeeName(id);
    }
}