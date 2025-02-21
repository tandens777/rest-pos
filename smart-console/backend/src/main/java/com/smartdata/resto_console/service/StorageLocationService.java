package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.smartdata.resto_console.repository.StorageLocationRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.StorageLocation;

@Service
public class StorageLocationService {
    
    @Autowired
    private StorageLocationRepository storageLocationRepository;

    @Transactional
    public void addStorageLocation(String locationNm) {
        storageLocationRepository.addStorageLocation(locationNm);
    }

    @Transactional
    public void updateStorageLocation(Integer locationId, String locationNm) {
        storageLocationRepository.updateStorageLocation(locationId, locationNm);
    }

    @Transactional
    public void deleteStorageLocation(Integer id) {
        storageLocationRepository.deleteStorageLocation(id);
    }

    public Optional<StorageLocation> getStorageLocation(Integer locationId) throws GenericNotFoundException {
        Optional<StorageLocation> storageLocation = storageLocationRepository.findById(locationId);

        if (storageLocation.isPresent()) {
            return storageLocation;
        } else {
            throw new GenericNotFoundException("Storage Location not found with id: " + locationId);
        }
    }

    // copy sample for retrieving all records or by search word and sorted
    public List<StorageLocation> getStorageLocations(String searchTerm) throws GenericNotFoundException {
        List<StorageLocation> storageLocations;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            storageLocations = storageLocationRepository.findByNameContainingIgnoreCaseOrderByName(searchTerm);
        } else {
            storageLocations = storageLocationRepository.findAllByOrderByLocationNm();
        }

        if (!storageLocations.isEmpty()) {
            return storageLocations;
        } else {
            throw new GenericNotFoundException("No storage locations found.");
        }
    }
}
