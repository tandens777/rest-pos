package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdata.resto_console.repository.SurDiscRepository;
import com.smartdata.resto_console.exception.GenericNotFoundException;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import com.smartdata.resto_console.model.SurchargeDiscount;

@Service
public class SurDiscService {

    @Autowired
    private SurDiscRepository surDiscRepository;

    @Transactional
    public void addSurchargeDiscount(String disc_desc, String disc_type, Integer parent_disc_id, String is_category, Double percentage, 
    Double amt, String picture_src, String need_ref, String short_nm, String auto_flag, String need_authorization, String check_senior, 
    String active_flag, Integer sm_discount_type, String pcnt_on_nv_flag, Integer sort_order) {
        surDiscRepository.addSurchargeDiscount(disc_desc, disc_type, parent_disc_id, is_category, percentage, amt, picture_src, 
        need_ref, short_nm, auto_flag, need_authorization, check_senior, active_flag, sm_discount_type, pcnt_on_nv_flag, sort_order);
    }

    @Transactional
    public void updateSurchargeDiscount(Integer id, String disc_desc, String disc_type, Integer parent_disc_id, String is_category, 
    Double percentage, Double amt, String picture_src, String need_ref, String short_nm, String auto_flag, String need_authorization, 
    String check_senior, String active_flag, Integer sm_discount_type, String pcnt_on_nv_flag, Integer sort_order) {
        surDiscRepository.updateSurchargeDiscount(id, disc_desc, disc_type, parent_disc_id, is_category, percentage, amt, picture_src, 
        need_ref, short_nm, auto_flag, need_authorization, check_senior, active_flag, sm_discount_type, pcnt_on_nv_flag, sort_order);
    }

    @Transactional
    public void deleteSurchargeDiscount(Integer id) {
        surDiscRepository.deleteSurchargeDiscount(id);
    }

    public Optional<SurchargeDiscount> getSurchargeDiscount(Integer id) throws GenericNotFoundException {
        Optional<SurchargeDiscount> surchargeDiscount = surDiscRepository.findById(id);

        if (surchargeDiscount.isPresent()) {
            return surchargeDiscount;
        } else {
            throw new GenericNotFoundException("Surcharge discount not found with id: " + id);
        }
    }

    public List<SurchargeDiscount> getSurchargeDiscounts(String searchTerm) throws GenericNotFoundException {
        List<SurchargeDiscount> surchargeDiscounts;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            surchargeDiscounts = surDiscRepository.findByDiscDescContainingIgnoreCaseOrderBySortOrder(searchTerm);
        } else {
            surchargeDiscounts = surDiscRepository.findAllByOrderBySortOrder();
        }

        if (!surchargeDiscounts.isEmpty()) {
            return surchargeDiscounts;
        } else {
            throw new GenericNotFoundException("No surcharge discounts found.");
        }
    }

    public List<SurchargeDiscount> getSurDiscCategories() {
        List<SurchargeDiscount> surDiscs;
        surDiscs = surDiscRepository.findByIsCategoryContainingIgnoreCaseOrderBySortOrder("Y");

        if (!surDiscs.isEmpty()) {
            return surDiscs;
        } else {
            return null;
        }
    }

    public List<SurchargeDiscount> getChildSurchargeDiscounts(Integer parentDiscId) {
        if (parentDiscId == null) {
            parentDiscId = 0; // Return empty list if parent_id is null
        }
    
        List<SurchargeDiscount> surDiscs = surDiscRepository.findChildSurchargeDiscounts(parentDiscId);
    
        return surDiscs != null ? surDiscs : new ArrayList<>(); // Ensure non-null return
    }


}
