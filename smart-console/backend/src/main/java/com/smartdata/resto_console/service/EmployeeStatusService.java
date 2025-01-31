package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.EmployeeStatusRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.EmployeeStatus;

@Service
public class EmployeeStatusService {

    @Autowired
    private EmployeeStatusRepository empStatusRepository;

    // copy sample for retrieving all records or by search word and sorted
    public List<EmployeeStatus> getEmployeeStatuses() throws GenericNotFoundException {
        List<EmployeeStatus> employeeStatuses;
        employeeStatuses = empStatusRepository.findAllByOrderByEmpStatusId();

        if (!employeeStatuses.isEmpty()) {
            return employeeStatuses;
        } else {
            throw new GenericNotFoundException("No Employee Statuses found.");
        }
    }

}