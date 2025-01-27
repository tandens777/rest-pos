package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.FloorRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.Floor;

@Service
public class FloorService {

    @Autowired
    private FloorRepository floorRepository;

    @Transactional
    public void addFloor(String name) {
        floorRepository.addFloor(name);
    }

    @Transactional
    public void updateFloor(Integer id, String name) {
        floorRepository.updateFloor(id, name);
    }

    @Transactional
    public void deleteFloor(Integer id) {
        floorRepository.deleteFloor(id);
    }

    public Optional<Floor> getFloor(Integer id) throws GenericNotFoundException {
        Optional<Floor> floor = floorRepository.findById(id);

        if (floor.isPresent()) {
            return floor;
        } else {
            throw new GenericNotFoundException("Floor not found with id: " + id);
        }
    }

    // copy sample for retrieving all records or by search word and sorted
    public List<Floor> getFloors(String searchTerm) throws GenericNotFoundException {
        List<Floor> floors;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            floors = floorRepository.findByNameContainingIgnoreCaseOrderById(searchTerm);
        } else {
            floors = floorRepository.findAllByOrderById();
        }

        if (!floors.isEmpty()) {
            return floors;
        } else {
            throw new GenericNotFoundException("No floors found.");
        }
    }

}