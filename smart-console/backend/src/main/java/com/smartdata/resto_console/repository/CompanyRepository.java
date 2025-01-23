package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.Company;
import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "updateCompany")
    void updateCompany(@Param("p_id") Integer id, 
    @Param("p_cmpy_nm") String cmpy_nm, @Param("p_operated_by") String operated_by, @Param("p_tin_no") String tin_no, @Param("p_address1") String address1, 
    @Param("p_address2") String address2, @Param("p_roller_txt") String roller_txt, @Param("p_branch_manager") String branch_manager, 
    @Param("p_branch_tel_no") String branch_tel_no, @Param("p_email") String email, @Param("p_table_count") Integer table_count, 
    @Param("p_pickup_count") Integer pickup_count, @Param("p_dlvry_count") Integer dlvry_count, 
    @Param("p_send_to_kitchen") String send_to_kitchen, @Param("p_track_invty_flag") String track_invty_flag);
    
}
