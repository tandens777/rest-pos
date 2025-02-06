package com.smartdata.resto_console.security;

public class FaceLoginRequest {
    private float[] facialFeatures;

    // Getters and Setters
    public float[] getFacialFeatures() {
        return facialFeatures;
    }

    public void setFacialFeatures(float[] facialFeatures) {
        this.facialFeatures = facialFeatures;
    }
}