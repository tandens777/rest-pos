package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.smartdata.resto_console.model.Role;

import com.smartdata.resto_console.repository.RoleRepository;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<String> getDistinctRoles() {
        return roleRepository.findRoles();
    }

    public List<String> getRolesByName(String name) {
        return roleRepository.getRolesByName(name);
    }

}
