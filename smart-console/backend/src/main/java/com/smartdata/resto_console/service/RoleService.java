package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.smartdata.resto_console.model.Role;

import com.smartdata.resto_console.repository.RoleRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getDistinctRoles() {
        return roleRepository.findRoles();
    }

    public List<String> getRolesByName(String name) {
        return roleRepository.getRolesByName(name);
    }


    // copy sample for retrieving all records or by search word and sorted
    public List<Role> getRoles() throws GenericNotFoundException {
        List<Role> roles;
        roles = roleRepository.findAllByOrderById();

        if (!roles.isEmpty()) {
            return roles;
        } else {
            throw new GenericNotFoundException("No roles found.");
        }
    }

}
