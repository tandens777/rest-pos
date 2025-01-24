package com.smartdata.resto_console.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "company_branch")

// declare all your stored procs here, the parameters 
@NamedStoredProcedureQueries({
    @NamedStoredProcedureQuery(
        name = "updateCompany",
        procedureName = "update_company",
        parameters = {
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_id", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_cmpy_nm", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_operated_by", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_tin_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_address1", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_address2", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_roller_txt", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_branch_manager", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_branch_tel_no", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_email", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_logo_filename", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_dinein_count", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_pickup_count", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_dlvry_count", type = Integer.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_send_to_kitchen", type = String.class),
            @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_track_invty_flag", type = String.class),
        }
    )
})

public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cmpy_nm") 
    private String cmpyName;

    @Column(name = "operated_by") 
    private String operatedBy;    

    @Column(name = "tin_no") 
    private String tinNo;    

    @Column(name = "address1") 
    private String address1;    

    @Column(name = "address2") 
    private String address2;    

    @Column(name = "reset_key") 
    private String resetKey;    

    @Column(name = "reset_counter") 
    private String resetCounter;    

    @Column(name = "reset_date") 
    private String resetDate;    

    @Column(name = "roller_txt") 
    private String rollerTxt;    

    @Column(name = "branch_manager") 
    private String branchManager;    

    @Column(name = "branch_tel_no") 
    private String branchTelNo;    

    @Column(name = "email") 
    private String email;    

    @Column(name = "logo_filename") 
    private String logoFilename;    

    @Column(name = "dinein_count") 
    private Integer dineinCount;    

    @Column(name = "pickup_count") 
    private Integer pickupCount;    

    @Column(name = "dlvry_count") 
    private Integer dlvryCount;    

    @Column(name = "send_to_kitchen") 
    private String sendToKitchen;    

    @Column(name = "track_invty_flag") 
    private String trackInvtyFlag;    

    // Getters and setters
}