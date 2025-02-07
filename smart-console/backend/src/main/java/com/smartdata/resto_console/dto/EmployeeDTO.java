package com.smartdata.resto_console.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class EmployeeDTO {
    public String emp_no;
    public String last_nm;
    public String first_nm;
    public String gender;
    public Integer station_id;
    public String tin_no;
    public String sss_no;
    public LocalDate bday;
    public String phone_no;
    public LocalDate date_hired;
    public LocalDate date_end;
    public String remarks;
    public String facial_features; // This will now be sent as JSON
    public String public_key;
    public String console_flag;
    public String drawer_flag;
    public String active_flag;
    public String pic_filename;
    public String address;
    public String email;
    public Integer emp_type_id;
    public Integer emp_status_id;
    public String password;
    public String username;
    public Long role_id;
    
    // Weekly schedule
    public String mon_restday;
    public LocalTime mon_start1;
    public LocalTime mon_end1;
    public LocalTime mon_start2;
    public LocalTime mon_end2;
    public LocalTime mon_start3;
    public LocalTime mon_end3;

    public String tue_restday;
    public LocalTime tue_start1;
    public LocalTime tue_end1;
    public LocalTime tue_start2;
    public LocalTime tue_end2;
    public LocalTime tue_start3;
    public LocalTime tue_end3;

    public String wed_restday;
    public LocalTime wed_start1;
    public LocalTime wed_end1;
    public LocalTime wed_start2;
    public LocalTime wed_end2;
    public LocalTime wed_start3;
    public LocalTime wed_end3;

    public String thu_restday;
    public LocalTime thu_start1;
    public LocalTime thu_end1;
    public LocalTime thu_start2;
    public LocalTime thu_end2;
    public LocalTime thu_start3;
    public LocalTime thu_end3;

    public String fri_restday;
    public LocalTime fri_start1;
    public LocalTime fri_end1;
    public LocalTime fri_start2;
    public LocalTime fri_end2;
    public LocalTime fri_start3;
    public LocalTime fri_end3;

    public String sat_restday;
    public LocalTime sat_start1;
    public LocalTime sat_end1;
    public LocalTime sat_start2;
    public LocalTime sat_end2;
    public LocalTime sat_start3;
    public LocalTime sat_end3;

    public String sun_restday;
    public LocalTime sun_start1;
    public LocalTime sun_end1;
    public LocalTime sun_start2;
    public LocalTime sun_end2;
    public LocalTime sun_start3;
    public LocalTime sun_end3;
}
