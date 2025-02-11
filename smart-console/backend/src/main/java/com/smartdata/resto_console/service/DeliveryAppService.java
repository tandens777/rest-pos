package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.DeliveryAppRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import com.smartdata.resto_console.model.DeliveryApp;

@Service
public class DeliveryAppService {

    @Autowired
    private DeliveryAppRepository dlvryAppRepository;

    @Transactional
    public void addDeliveryApp(String app_nm, String order_type, String active_flag, Integer table_count, String pic_filename, Double app_add_pcnt, Double app_add_amt) {
        dlvryAppRepository.addDeliveryApp(app_nm, order_type, active_flag, table_count, pic_filename, app_add_pcnt, app_add_amt);
    }

    @Transactional
    public void updateDeliveryApp(Integer id, String app_nm, String order_type, String active_flag, Integer table_count, String pic_filename, Double app_add_pcnt, Double app_add_amt) {
        dlvryAppRepository.updateDeliveryApp(id, app_nm, order_type, active_flag, table_count, pic_filename, app_add_pcnt, app_add_amt);
    }

    @Transactional
    public void deleteDeliveryApp(Integer id) {
        dlvryAppRepository.deleteDeliveryApp(id);
    }

    public Optional<DeliveryApp> getDeliveryApp(Integer id) throws GenericNotFoundException {
        Optional<DeliveryApp> dlvryApp = dlvryAppRepository.findById(id);

        if (dlvryApp.isPresent()) {
            return dlvryApp;
        } else {
            throw new GenericNotFoundException("Delivery App not found with id: " + id);
        }
    }

    // copy sample for retrieving all records or by search word and sorted
    public List<DeliveryApp> getDeliveryApps(String searchTerm) throws GenericNotFoundException {
        List<DeliveryApp> dlvryApps;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            dlvryApps = dlvryAppRepository.findByAppNmContainingIgnoreCaseOrderByAppNm(searchTerm);
        } else {
            dlvryApps = dlvryAppRepository.findAllByOrderByAppNm();
        }

        if (!dlvryApps.isEmpty()) {
            return dlvryApps;
        } else {
            throw new GenericNotFoundException("No delivery apps found.");
        }
    }

}