package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.EmployeeTypeRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.EmployeeType;

@Service
public class EmployeeTypeService {

    @Autowired
    private EmployeeTypeRepository empTypeRepository;

    // copy sample for retrieving all records or by search word and sorted
    public List<EmployeeType> getEmployeeTypes() throws GenericNotFoundException {
        List<EmployeeType> employeeTypes;
        employeeTypes = empTypeRepository.findAllByOrderByEmpTypeId();

        if (!employeeTypes.isEmpty()) {
            return employeeTypes;
        } else {
            throw new GenericNotFoundException("No Employee Types found.");
        }
    }

}