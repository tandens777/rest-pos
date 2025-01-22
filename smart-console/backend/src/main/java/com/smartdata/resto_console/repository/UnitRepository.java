package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.Unit;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {

    //SAMPLE FOR USING STORED PROCEDURES

    @Procedure(name = "addUnit")
    void addUnit(@Param("p_unit_code") String unit_code, @Param("p_unit_desc") String unit_desc);

    @Procedure(name = "updateUnit")
    void updateUnit(@Param("p_id") Long id, @Param("p_unit_code") String unit_code, @Param("p_unit_desc") String unit_desc);

    @Procedure(name = "deleteUnit")
    void deleteUnit(@Param("p_id") Long id);

}
