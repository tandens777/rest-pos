package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.UnitRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.Unit;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    @Transactional
    public void addUnit(String unit_code, String unit_desc) {
        unitRepository.addUnit(unit_code, unit_desc);
    }

    @Transactional
    public void updateUnit(Long id, String unit_code, String unit_desc) {
        unitRepository.updateUnit(id, unit_code, unit_desc);
    }

    @Transactional
    public void deleteUnit(Long id) {
        unitRepository.deleteUnit(id);
    }

    public Optional<Unit> getUnit(Long id) throws GenericNotFoundException {
        Optional<Unit> unit = unitRepository.findById(id);

        if (unit.isPresent()) {
            return unit;
        } else {
            throw new GenericNotFoundException("Unit not found with id: " + id);
        }
    }

    public List<Unit> getUnits(String searchTerm) throws GenericNotFoundException {
        List<Unit> units;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            units = unitRepository.findByUnitDescContainingIgnoreCaseOrderByUnitCode(searchTerm);
        } else {
            units = unitRepository.findAllByOrderByUnitCode();
        }

        if (!units.isEmpty()) {
            return units;
        } else {
            throw new GenericNotFoundException("No units found.");
        }
    }

}