package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    //SAMPLE FOR USING STORED PROCEDURES

    @Procedure(name = "insertEmployee")
    void insertEmployee(@Param("p_name") String name);

    @Procedure(name = "updateEmployee")
    void updateEmployee(@Param("p_id") Long id, @Param("p_name") String name);

    @Procedure(name = "deleteEmployee")
    void deleteEmployee(@Param("p_id") Long id);

    @Procedure(name = "getEmployee")
    String getEmployeeName(@Param("p_id") Long id);
}
