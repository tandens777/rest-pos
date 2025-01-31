package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data

@Table(name = "employees")

@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "insertEmployee",
        procedureName = "insert_employee",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_emp_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_last_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_first_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_gender", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tin_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sss_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_bday", type = LocalDate.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_phone_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_date_hired", type = LocalDate.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_date_end", type = LocalDate.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_remarks", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_face_id", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_public_key", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_console_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_drawer_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pic_filename", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_address", type = String.class),            
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_email", type = String.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_emp_type_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_emp_status_id", type = Integer.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_password", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_username", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_role_id", type = Long.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_end3", type = LocalTime.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "updateEmployee",
        procedureName = "update_employee",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Long.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_emp_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_last_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_first_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_gender", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_station_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tin_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sss_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_bday", type = LocalDate.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_phone_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_date_hired", type = LocalDate.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_date_end", type = LocalDate.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_remarks", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_face_id", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_public_key", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_console_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_drawer_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_active_flag", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pic_filename", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_address", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_email", type = String.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_emp_type_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_emp_status_id", type = Integer.class),
            
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_password", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_username", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_role_id", type = Long.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_mon_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tue_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_wed_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_thu_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_fri_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sat_end3", type = LocalTime.class),

            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_restday", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_start1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_end1", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_start2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_end2", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_start3", type = LocalTime.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_sun_end3", type = LocalTime.class)
        }
    ),
    @NamedStoredProcedureQuery(
        name = "deleteEmployee",
        procedureName = "delete_employee",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Long.class)
        }
    ),
})

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "emp_no", nullable = false) 
    private String empNo;

    @Column(name = "last_nm", nullable = false) 
    private String lastNm;

    @Column(name = "first_nm", nullable = false) 
    private String firstNm;

    @Column(name = "gender") 
	private String gender;

    @Column(name = "station_id") 
	private Integer stationId;

    @Column(name = "tin_no") 
	private String tinNo;

    @Column(name = "sss_no") 
	private String sssNo;

    @Column(name = "bday") 
	private LocalDate bday;

    @Column(name = "phone_no") 
	private String phoneNo;

    @Column(name = "date_hired") 
	private LocalDate dateHired;

    @Column(name = "date_end") 
	private LocalDate dateEnd;

    @Column(name = "remarks") 
	private String remarks;

    @Column(name = "face_id") 
	private String faceId;

    @Column(name = "public_key") 
	private String publicKey;

    @Column(name = "console_flag") 
	private String consoleFlag;

    @Column(name = "drawer_flag") 
	private String drawerFlag;

    @Column(name = "active_flag") 
	private String activeFlag;

    @Column(name = "pic_filename") 
	private String picFilename;

    @Column(name = "address") 
	private String address;

    @Column(name = "email") 
	private String email;

    @Column(name = "emp_type_id", nullable = false) 
	private Integer empTypeId;

    @Column(name = "emp_status_id", nullable = false) 
	private Integer empStatusId;

    @Column(name = "password", unique = true, nullable = false) 
	private String password;

    @Column(name = "username", unique = true, nullable = false) 
	private String username;

    @Column(name = "role_id", nullable = false) 
	private Long roleId;

    //----------------------------------------------
    // Time fields
    @Column(name = "mon_restday") 
	private String monRestday;

    @Column(name = "mon_start1")
    private LocalTime monStart1;

    @Column(name = "mon_end1")
    private LocalTime monEnd1;

    @Column(name = "mon_start2")
    private LocalTime monStart2;

    @Column(name = "mon_end2")
    private LocalTime monEnd2;

    @Column(name = "mon_start3")
    private LocalTime monStart3;

    @Column(name = "mon_end3")
    private LocalTime monEnd3;

    //---------------------------------------
    @Column(name = "tue_restday") 
	private String tueRestday;

    @Column(name = "tue_start1")
    private LocalTime tueStart1;

    @Column(name = "tue_end1")
    private LocalTime tueEnd1;

    @Column(name = "tue_start2")
    private LocalTime tueStart2;

    @Column(name = "tue_end2")
    private LocalTime tueEnd2;

    @Column(name = "tue_start3")
    private LocalTime tueStart3;

    @Column(name = "tue_end3")
    private LocalTime tueEnd3;

    //---------------------------------------
    @Column(name = "wed_restday") 
	private String wedRestday;

    @Column(name = "wed_start1")
    private LocalTime wedStart1;

    @Column(name = "wed_end1")
    private LocalTime wedEnd1;

    @Column(name = "wed_start2")
    private LocalTime wedStart2;

    @Column(name = "wed_end2")
    private LocalTime wedEnd2;

    @Column(name = "wed_start3")
    private LocalTime wedStart3;

    @Column(name = "wed_end3")
    private LocalTime wedEnd3;

    //---------------------------------------
    @Column(name = "thu_restday") 
	private String thuRestday;

    @Column(name = "thu_start1")
    private LocalTime thuStart1;

    @Column(name = "thu_end1")
    private LocalTime thuEnd1;

    @Column(name = "thu_start2")
    private LocalTime thuStart2;

    @Column(name = "thu_end2")
    private LocalTime thuEnd2;

    @Column(name = "thu_start3")
    private LocalTime thuStart3;

    @Column(name = "thu_end3")
    private LocalTime thuEnd3;

    //---------------------------------------
    @Column(name = "fri_restday") 
	private String friRestday;

    @Column(name = "fri_start1")
    private LocalTime friStart1;

    @Column(name = "fri_end1")
    private LocalTime friEnd1;

    @Column(name = "fri_start2")
    private LocalTime friStart2;

    @Column(name = "fri_end2")
    private LocalTime friEnd2;

    @Column(name = "fri_start3")
    private LocalTime friStart3;

    @Column(name = "fri_end3")
    private LocalTime friEnd3;

    //---------------------------------------
    @Column(name = "sat_restday") 
	private String satRestday;

    @Column(name = "sat_start1")
    private LocalTime satStart1;

    @Column(name = "sat_end1")
    private LocalTime satEnd1;

    @Column(name = "sat_start2")
    private LocalTime satStart2;

    @Column(name = "sat_end2")
    private LocalTime satEnd2;

    @Column(name = "sat_start3")
    private LocalTime satStart3;

    @Column(name = "sat_end3")
    private LocalTime satEnd3;

    //---------------------------------------
    @Column(name = "sun_restday") 
	private String sunRestday;

    @Column(name = "sun_start1")
    private LocalTime sunStart1;

    @Column(name = "sun_end1")
    private LocalTime sunEnd1;

    @Column(name = "sun_start2")
    private LocalTime sunStart2;

    @Column(name = "sun_end2")
    private LocalTime sunEnd2;

    @Column(name = "sun_start3")
    private LocalTime sunStart3;

    @Column(name = "sun_end3")
    private LocalTime sunEnd3;

    // Getters and setters
}