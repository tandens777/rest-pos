package com.smartdata.resto_console.dto;

public class SMPayTypeDTO {
    private Integer sm_pay_type;
    private String sm_pay_type_desc;

    public SMPayTypeDTO(Integer sm_pay_type, String sm_pay_type_desc) {
        this.sm_pay_type = sm_pay_type;
        this.sm_pay_type_desc = sm_pay_type_desc;
    }

    // Getters and Setters
    public Integer getSMPayType() { return sm_pay_type; }
    public void setSMPayType(Integer sm_pay_type) { this.sm_pay_type = sm_pay_type; }

    public String getSMPayTypeDesc() { return sm_pay_type_desc; }
    public void setSMPayTypeDesc(String sm_pay_type_desc) { this.sm_pay_type_desc = sm_pay_type_desc; }

}
