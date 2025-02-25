package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.FoodStation;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface FoodStationRepository extends JpaRepository<FoodStation, Integer> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "addFoodStation")
    void addFoodStation(@Param("p_station_nm") String station_nm);

    @Procedure(name = "updateFoodStation")
    void updateFoodStation(@Param("p_station_id") Integer station_id, @Param("p_station_nm") String station_nm);

    @Procedure(name = "deleteFoodStation")
    void deleteFoodStation(@Param("p_station_id") Integer station_id);

    @Query("SELECT f FROM FoodStation f WHERE LOWER(f.stationNm) LIKE LOWER(concat('%', :searchTerm, '%')) ORDER BY f.stationNm")
    List<FoodStation> findByNameContainingIgnoreCaseOrderByName(@Param("searchTerm") String searchTerm);

    // Sort all by station_nm
    // auto generated by JPA, no need for code
    List<FoodStation> findAllByOrderByStationNm();    
}
