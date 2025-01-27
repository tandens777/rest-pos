package com.smartdata.resto_console.controller;

import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.smartdata.resto_console.model.TablePicture;

import com.smartdata.resto_console.service.TablePictureService;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/table_pictures")
public class TablePictureController {

    @Autowired
    private TablePictureService picService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<TablePicture> getTablePictures() {
        return picService.getTablePictures();
    }

}
