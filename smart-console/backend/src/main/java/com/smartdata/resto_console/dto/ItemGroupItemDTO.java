package com.smartdata.resto_console.dto;

public class ItemGroupItemDTO {
    private Long id;
    private Integer itemGrpId;
    private Integer itemId;
    private String itemCode;
    private String itemDesc;
    private Double addonPrice;

    // Default Constructor
    public ItemGroupItemDTO() {
    }

    // Parameterized Constructor
    public ItemGroupItemDTO(Long id, Integer itemGrpId, Integer itemId, String itemCode, String itemDesc, Double addonPrice) {
        this.id = id;
        this.itemGrpId = itemGrpId;
        this.itemId = itemId;
        this.itemCode = itemCode;
        this.itemDesc = itemDesc;
        this.addonPrice = addonPrice;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public Integer getItemGrpId() {
        return itemGrpId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public String getItemCode() {
        return itemCode;
    }

    public String getItemDesc() {
        return itemDesc;
    }

    public Double getAddonPrice() {
        return addonPrice;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setItemGrpId(Integer itemGrpId) {
        this.itemGrpId = itemGrpId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public void setItemDesc(String itemDesc) {
        this.itemDesc = itemDesc;
    }

    public void setAddonPrice(Double addonPrice) {
        this.addonPrice = addonPrice;
    }

    // toString method for debugging/logging
    @Override
    public String toString() {
        return "ItemGroupItemDTO{" +
                "id=" + id +
                ", itemGrpId=" + itemGrpId +
                ", itemId=" + itemId +
                ", itemCode='" + itemCode + '\'' +
                ", itemDesc='" + itemDesc + '\'' +
                ", addonPrice=" + addonPrice +
                '}';
    }
}
