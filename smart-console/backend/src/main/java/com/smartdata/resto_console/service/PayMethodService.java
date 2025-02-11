package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.PayMethodRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import com.smartdata.resto_console.model.PayMethod;
@Service
public class PayMethodService {

    @Autowired
    private PayMethodRepository payMethodRepository;

    @Transactional
    public void addPayMethod(String pay_mtd_desc, Integer parent_pay_mtd_id, String is_category, String picture_src, String need_ref, 
    String need_expdt, String short_nm, String active_flag, Double bank_charges, Integer sm_pay_type) {
        payMethodRepository.addPayMethod(pay_mtd_desc, parent_pay_mtd_id, is_category, picture_src, need_ref, 
        need_expdt, short_nm, active_flag, bank_charges, sm_pay_type);
    }

    @Transactional
    public void updatePayMethod(Integer id, String pay_mtd_desc, Integer parent_pay_mtd_id, String is_category, String picture_src, String need_ref, 
        String need_expdt, String short_nm, String active_flag, Double bank_charges, Integer sm_pay_type) {
        payMethodRepository.updatePayMethod(id, pay_mtd_desc, parent_pay_mtd_id, is_category, picture_src, need_ref, 
        need_expdt, short_nm, active_flag, bank_charges, sm_pay_type);
    }

    @Transactional
    public void deletePayMethod(Integer id) {
        payMethodRepository.deletePayMethod(id);
    }

    public Optional<PayMethod> getPayMethod(Integer id) throws GenericNotFoundException {
        Optional<PayMethod> payMethod = payMethodRepository.findById(id);

        if (payMethod.isPresent()) {
            return payMethod;
        } else {
            throw new GenericNotFoundException("Pay method not found with id: " + id);
        }
    }

    // copy sample for retrieving all records or by search word and sorted
    public List<PayMethod> getPayMethods(String searchTerm) throws GenericNotFoundException {
        List<PayMethod> payMethods;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            payMethods = payMethodRepository.findByPayMtdDescContainingIgnoreCaseOrderByPayMtdDesc(searchTerm);
        } else {
            payMethods = payMethodRepository.findAllByOrderByPayMtdDesc();
        }

        if (!payMethods.isEmpty()) {
            return payMethods;
        } else {
            throw new GenericNotFoundException("No pay methods found.");
        }
    }

    public List<PayMethod> getPayMethodCategories() {
        List<PayMethod> payMethods;
        payMethods = payMethodRepository.findByIsCategoryContainingIgnoreCaseOrderByPayMtdDesc("Y");

        if (!payMethods.isEmpty()) {
            return payMethods;
        } else {
            return null;
        }
    }


    public List<PayMethod> getChildPayMethods(Integer parentPayMtdId) {
        if (parentPayMtdId == null) {
            parentPayMtdId = 0; // Return empty list if parent_id is null
        }
    
        List<PayMethod> payMethods = payMethodRepository.findChildPayMethods(parentPayMtdId);
    
        return payMethods != null ? payMethods : new ArrayList<>(); // Ensure non-null return
    }
    

}