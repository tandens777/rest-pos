package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartdata.resto_console.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);  // Custom query method to find roles by name
}
