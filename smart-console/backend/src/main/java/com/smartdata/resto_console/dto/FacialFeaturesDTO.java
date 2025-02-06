package com.smartdata.resto_console.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class FacialFeaturesDTO {
    
    @Schema(description = "Array of facial feature values")
    private String facialFeatures; // Store JSON string instead of float[]

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public String getFacialFeatures() {
        return facialFeatures;
    }

    public void setFacialFeatures(String facialFeatures) {
        this.facialFeatures = facialFeatures;
    }

    public float[] getFacialFeaturesAsArray() {
        try {
            if (!(facialFeatures == null || facialFeatures.trim().isEmpty())) {
                return objectMapper.readValue(facialFeatures, float[].class);
            } else {
                return null;
            }
        } catch (JsonProcessingException e) {
            return new float[0]; // Handle error gracefully
        }
    }

    public void setFacialFeaturesFromArray(float[] features) {
        try {
            if (features != null) {
                this.facialFeatures = objectMapper.writeValueAsString(features);
            } 
        } catch (JsonProcessingException e) {
            this.facialFeatures = "[]"; // Handle error
        }
    }
}
