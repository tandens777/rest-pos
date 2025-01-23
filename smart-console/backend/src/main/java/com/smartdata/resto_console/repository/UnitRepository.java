package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.Unit;
import java.util.List;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {

    @Procedure(name = "addUnit")
    void addUnit(@Param("p_unit_code") String unit_code, @Param("p_unit_desc") String unit_desc);

    @Procedure(name = "updateUnit")
    void updateUnit(@Param("p_id") Long id, @Param("p_unit_code") String unit_code, @Param("p_unit_desc") String unit_desc);

    @Procedure(name = "deleteUnit")
    void deleteUnit(@Param("p_id") Long id);

    // Search by unit_desc and sort by unit_code
    List<Unit> findByUnitDescContainingIgnoreCaseOrderByUnitCode(String unitDesc);

    // Sort all by unit_code
    List<Unit> findAllByOrderByUnitCode();    
}
