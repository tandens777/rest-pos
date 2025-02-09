package com.smartdata.resto_console.dto;

public class SMDiscTypeDTO {
    private Integer sm_discount_type;
    private String sm_discount_type_desc;

    public SMDiscTypeDTO(Integer sm_discount_type, String sm_discount_type_desc) {
        this.sm_discount_type = sm_discount_type;
        this.sm_discount_type_desc = sm_discount_type_desc;
    }

    // Getters and Setters
    public Integer getSMDiscType() { return sm_discount_type; }
    public void setSMDiscType(Integer sm_discount_type) { this.sm_discount_type = sm_discount_type; }

    public String getSMDiscTypeDesc() { return sm_discount_type_desc; }
    public void setSMDiscTypeDesc(String sm_discount_type_desc) { this.sm_discount_type_desc = sm_discount_type_desc; }

}
