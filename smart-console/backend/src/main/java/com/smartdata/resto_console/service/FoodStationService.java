package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.smartdata.resto_console.repository.FoodStationRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.FoodStation;

@Service
public class FoodStationService {
    
    @Autowired
    private FoodStationRepository foodStationRepository;

    @Transactional
    public void addFoodStation(String stationNm) {
        foodStationRepository.addFoodStation(stationNm);
    }

    @Transactional
    public void updateFoodStation(Integer stationId, String stationNm) {
        foodStationRepository.updateFoodStation(stationId, stationNm);
    }

    @Transactional
    public void deleteFoodStation(Integer id) {
        foodStationRepository.deleteFoodStation(id);
    }

    public Optional<FoodStation> getFoodStation(Integer stationId) throws GenericNotFoundException {
        Optional<FoodStation> foodStation = foodStationRepository.findById(stationId);

        if (foodStation.isPresent()) {
            return foodStation;
        } else {
            throw new GenericNotFoundException("Food Station not found with id: " + stationId);
        }
    }

    // copy sample for retrieving all records or by search word and sorted
    public List<FoodStation> getFoodStations(String searchTerm) throws GenericNotFoundException {
        List<FoodStation> foodStations;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            foodStations = foodStationRepository.findByNameContainingIgnoreCaseOrderById(searchTerm);
        } else {
            foodStations = foodStationRepository.findAllByOrderByStationId();
        }

        if (!foodStations.isEmpty()) {
            return foodStations;
        } else {
            throw new GenericNotFoundException("No food stations found.");
        }
    }
}
