package com.smartdata.resto_console.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartdata.resto_console.model.TablePicture;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TablePictureRepository extends JpaRepository<TablePicture, Long> {
    TablePicture findByFilename(String filename);  // Custom query method to find roles by name

    @Query("SELECT a FROM TablePicture a") // Corrected query
    List<TablePicture> findTablePictures();

}
