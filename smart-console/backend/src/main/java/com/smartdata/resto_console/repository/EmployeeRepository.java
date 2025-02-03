package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.Employee;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Insert Employee
    @Procedure(name = "insertEmployee")
    void insertEmployee(
        @Param("p_emp_no") String emp_no,
        @Param("p_last_nm") String last_nm,
        @Param("p_first_nm") String first_nm,
        @Param("p_gender") String gender,
        @Param("p_station_id") Integer station_id,
        @Param("p_tin_no") String tin_no,
        @Param("p_sss_no") String sss_no,
        @Param("p_bday") LocalDate bday,
        @Param("p_phone_no") String phone_no,
        @Param("p_date_hired") LocalDate date_hired,
        @Param("p_date_end") LocalDate date_end,
        @Param("p_remarks") String remarks,
        @Param("p_face_id") String face_id,
        @Param("p_public_key") String public_key,
        @Param("p_console_flag") String console_flag,
        @Param("p_drawer_flag") String drawer_flag,
        @Param("p_active_flag") String active_flag,
        @Param("p_pic_filename") String pic_filename,

        @Param("p_address") String address,
        @Param("p_email") String email,
        @Param("p_emp_type_id") Integer emp_type_id,
        @Param("p_emp_status_id") Integer emp_status_id,

        @Param("p_password") String password,
        @Param("p_username") String username,
        @Param("p_role_id") Long role_id,

        @Param("p_mon_restday") String mon_restday,
        @Param("p_mon_start1") LocalTime mon_start1,
        @Param("p_mon_end1") LocalTime mon_end1,
        @Param("p_mon_start2") LocalTime mon_start2,
        @Param("p_mon_end2") LocalTime mon_end2,
        @Param("p_mon_start3") LocalTime mon_start3,
        @Param("p_mon_end3") LocalTime mon_end3,

        @Param("p_tue_restday") String tue_restday,
        @Param("p_tue_start1") LocalTime tue_start1,
        @Param("p_tue_end1") LocalTime tue_end1,
        @Param("p_tue_start2") LocalTime tue_start2,
        @Param("p_tue_end2") LocalTime tue_end2,
        @Param("p_tue_start3") LocalTime tue_start3,
        @Param("p_tue_end3") LocalTime tue_end3,

        @Param("p_wed_restday") String wed_restday,
        @Param("p_wed_start1") LocalTime wed_start1,
        @Param("p_wed_end1") LocalTime wed_end1,
        @Param("p_wed_start2") LocalTime wed_start2,
        @Param("p_wed_end2") LocalTime wed_end2,
        @Param("p_wed_start3") LocalTime wed_start3,
        @Param("p_wed_end3") LocalTime wed_end3,

        @Param("p_thu_restday") String thu_restday,
        @Param("p_thu_start1") LocalTime thu_start1,
        @Param("p_thu_end1") LocalTime thu_end1,
        @Param("p_thu_start2") LocalTime thu_start2,
        @Param("p_thu_end2") LocalTime thu_end2,
        @Param("p_thu_start3") LocalTime thu_start3,
        @Param("p_thu_end3") LocalTime thu_end3,

        @Param("p_fri_restday") String fri_restday,
        @Param("p_fri_start1") LocalTime fri_start1,
        @Param("p_fri_end1") LocalTime fri_end1,
        @Param("p_fri_start2") LocalTime fri_start2,
        @Param("p_fri_end2") LocalTime fri_end2,
        @Param("p_fri_start3") LocalTime fri_start3,
        @Param("p_fri_end3") LocalTime fri_end3,

        @Param("p_sat_restday") String sat_restday,
        @Param("p_sat_start1") LocalTime sat_start1,
        @Param("p_sat_end1") LocalTime sat_end1,
        @Param("p_sat_start2") LocalTime sat_start2,
        @Param("p_sat_end2") LocalTime sat_end2,
        @Param("p_sat_start3") LocalTime sat_start3,
        @Param("p_sat_end3") LocalTime sat_end3,

        @Param("p_sun_restday") String sun_restday,
        @Param("p_sun_start1") LocalTime sun_start1,
        @Param("p_sun_end1") LocalTime sun_end1,
        @Param("p_sun_start2") LocalTime sun_start2,
        @Param("p_sun_end2") LocalTime sun_end2,
        @Param("p_sun_start3") LocalTime sun_start3,
        @Param("p_sun_end3") LocalTime sun_end3
    );

    // Update Employee
    @Procedure(name = "updateEmployee")
    void updateEmployee(
        @Param("p_id") Long id,
        @Param("p_emp_no") String emp_no,
        @Param("p_last_nm") String last_nm,
        @Param("p_first_nm") String first_nm,
        @Param("p_gender") String gender,
        @Param("p_station_id") Integer station_id,
        @Param("p_tin_no") String tin_no,
        @Param("p_sss_no") String sss_no,
        @Param("p_bday") LocalDate bday,
        @Param("p_phone_no") String phone_no,
        @Param("p_date_hired") LocalDate date_hired,
        @Param("p_date_end") LocalDate date_end,
        @Param("p_remarks") String remarks,
        @Param("p_face_id") String face_id,
        @Param("p_public_key") String public_key,
        @Param("p_console_flag") String console_flag,
        @Param("p_drawer_flag") String drawer_flag,
        @Param("p_active_flag") String active_flag,
        @Param("p_pic_filename") String pic_filename,

        @Param("p_address") String address,
        @Param("p_email") String email,
        @Param("p_emp_type_id") Integer emp_type_id,
        @Param("p_emp_status_id") Integer emp_status_id,

        @Param("p_password") String password,
        @Param("p_username") String username,
        @Param("p_role_id") Long role_id,

        @Param("p_mon_restday") String mon_restday,
        @Param("p_mon_start1") LocalTime mon_start1,
        @Param("p_mon_end1") LocalTime mon_end1,
        @Param("p_mon_start2") LocalTime mon_start2,
        @Param("p_mon_end2") LocalTime mon_end2,
        @Param("p_mon_start3") LocalTime mon_start3,
        @Param("p_mon_end3") LocalTime mon_end3,

        @Param("p_tue_restday") String tue_restday,
        @Param("p_tue_start1") LocalTime tue_start1,
        @Param("p_tue_end1") LocalTime tue_end1,
        @Param("p_tue_start2") LocalTime tue_start2,
        @Param("p_tue_end2") LocalTime tue_end2,
        @Param("p_tue_start3") LocalTime tue_start3,
        @Param("p_tue_end3") LocalTime tue_end3,

        @Param("p_wed_restday") String wed_restday,
        @Param("p_wed_start1") LocalTime wed_start1,
        @Param("p_wed_end1") LocalTime wed_end1,
        @Param("p_wed_start2") LocalTime wed_start2,
        @Param("p_wed_end2") LocalTime wed_end2,
        @Param("p_wed_start3") LocalTime wed_start3,
        @Param("p_wed_end3") LocalTime wed_end3,

        @Param("p_thu_restday") String thu_restday,
        @Param("p_thu_start1") LocalTime thu_start1,
        @Param("p_thu_end1") LocalTime thu_end1,
        @Param("p_thu_start2") LocalTime thu_start2,
        @Param("p_thu_end2") LocalTime thu_end2,
        @Param("p_thu_start3") LocalTime thu_start3,
        @Param("p_thu_end3") LocalTime thu_end3,

        @Param("p_fri_restday") String fri_restday,
        @Param("p_fri_start1") LocalTime fri_start1,
        @Param("p_fri_end1") LocalTime fri_end1,
        @Param("p_fri_start2") LocalTime fri_start2,
        @Param("p_fri_end2") LocalTime fri_end2,
        @Param("p_fri_start3") LocalTime fri_start3,
        @Param("p_fri_end3") LocalTime fri_end3,

        @Param("p_sat_restday") String sat_restday,
        @Param("p_sat_start1") LocalTime sat_start1,
        @Param("p_sat_end1") LocalTime sat_end1,
        @Param("p_sat_start2") LocalTime sat_start2,
        @Param("p_sat_end2") LocalTime sat_end2,
        @Param("p_sat_start3") LocalTime sat_start3,
        @Param("p_sat_end3") LocalTime sat_end3,

        @Param("p_sun_restday") String sun_restday,
        @Param("p_sun_start1") LocalTime sun_start1,
        @Param("p_sun_end1") LocalTime sun_end1,
        @Param("p_sun_start2") LocalTime sun_start2,
        @Param("p_sun_end2") LocalTime sun_end2,
        @Param("p_sun_start3") LocalTime sun_start3,
        @Param("p_sun_end3") LocalTime sun_end3
    );


    // Delete Employee
    @Procedure(name = "deleteEmployee")
    void deleteEmployee(@Param("p_id") Long id);

    // Change Employee PIN
    @Procedure(name = "changeEmployeePIN")
    void changePIN(       
        @Param("p_username") String username,
        @Param("p_new_password") String new_password
    );
    
    // Find all employees ordered by ID
    List<Employee> findAllByOrderById();

    @Query("SELECT e FROM Employee e WHERE LOWER(e.username) = :username")
    Optional<Employee> findByUsername(@Param("username") String username);

    @Query("SELECT e FROM Employee e WHERE e.username <> :username")
    List<Employee> findByUsernameNot(@Param("username") String username);
    
}