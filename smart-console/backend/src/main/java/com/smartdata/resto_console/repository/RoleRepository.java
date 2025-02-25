package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartdata.resto_console.model.Role;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);  // Custom query method to find roles by name

    @Query("SELECT r FROM Role r order by r.name") // sample to get records from table
    List<Role> findRoles();

    @Query("SELECT r.name FROM Role r WHERE r.name LIKE %:name%") // sample to pass parameter to query
    List<String> getRolesByName(@Param("name") String name);

    // auto generated by JPA, no need for code
    List<Role> findAllByOrderById();    

}
