package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.CompanyRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.Company;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository cmpyRepository;

    @Transactional
    public void updateCompany(Integer id, String cmpy_nm, String operated_by, String tin_no, String address1, String address2, String roller_txt, String branch_manager, 
        String branch_tel_no, String email, Integer table_count, Integer pickup_count, Integer dlvry_count, String send_to_kitchen, String track_invty_flag) {
        cmpyRepository.updateCompany(id, cmpy_nm, operated_by, tin_no, address1, address2, roller_txt, branch_manager, branch_tel_no, email, table_count, pickup_count, dlvry_count, send_to_kitchen, track_invty_flag);
    }

    public Optional<Company> getCompany(Integer id) throws GenericNotFoundException {
        Optional<Company> company = cmpyRepository.findById(id);

        if (company.isPresent()) {
            return company;
        } else {
            throw new GenericNotFoundException("Company not found with id: " + id);
        }
    }

}