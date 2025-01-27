package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartdata.resto_console.model.OrderTypeAlias;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface OrderTypeAliasRepository extends JpaRepository<OrderTypeAlias, Long> {

    // declare stored procedure mapping here for use in service
    @Procedure(name = "generateOrderTypeAlias")
    void generateOrderTypeAlias(@Param("p_order_type") String order_type, @Param("p_skip_nums") String skip_nums, @Param("p_start_num") int start_num);

    @Procedure(name = "updateOrderTypeAlias")
    void updateOrderTypeAlias(@Param("p_order_type") String order_type, 
        @Param("p_tbl_num") int tbl_num, 
        @Param("p_tbl_name") String tbl_name,
        @Param("p_floor_id") int floor_id,
        @Param("p_picture") String picture,
        @Param("p_position_x") int position_x,
        @Param("p_position_y") int position_y
    );

    // Add sorting by tbl_num
    //List<OrderTypeAlias> findByOrderType(String orderType, Sort sort);

    @Query("SELECT o FROM OrderTypeAlias o WHERE o.orderType = :orderType ORDER BY o.tblNum ASC")
    List<OrderTypeAlias> findByOrderType(@Param("orderType") String orderType);    
}
