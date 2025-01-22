package com.smartdata.resto_console.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.persistence.ParameterMode;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

import com.smartdata.resto_console.exception.EmployeeNotFoundException;

@Repository
public class EmployeeRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public void insertEmployee(String name) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("insert_employee")
            .registerStoredProcedureParameter("p_name", String.class, ParameterMode.IN)
            .setParameter("p_name", name);
        query.execute();
    }

    public void updateEmployee(Long id, String name) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("update_employee")
            .registerStoredProcedureParameter("p_id", Long.class, ParameterMode.IN)
            .registerStoredProcedureParameter("p_name", String.class, ParameterMode.IN)
            .setParameter("p_id", id)
            .setParameter("p_name", name);
        query.execute();
    }

    public void deleteEmployee(Long id) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("delete_employee")
            .registerStoredProcedureParameter("p_id", Long.class, ParameterMode.IN)
            .setParameter("p_id", id);
        query.execute();
    }

    public String getEmployeeName(Long id) {
        String name = null;
        try {
            StoredProcedureQuery query = entityManager.createStoredProcedureQuery("get_employee")
                .registerStoredProcedureParameter("p_id", Long.class, ParameterMode.IN)
                .registerStoredProcedureParameter("p_name", String.class, ParameterMode.OUT)
                .setParameter("p_id", id);
    
            query.execute();
            name = (String) query.getOutputParameterValue("p_name");
            System.out.println("Employee name: " + name);  // For debugging
            
            if (name == null) {
                throw new EmployeeNotFoundException("Employee not found with id: " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();  // Log the error for debugging
            throw new RuntimeException("Error executing stored procedure", e);
        }
        return name;
    }
 
    //@Query("SELECT DISTINCT r.roomType FROM Room r")
    //List<String> findDistinctRoomTypes();    
}