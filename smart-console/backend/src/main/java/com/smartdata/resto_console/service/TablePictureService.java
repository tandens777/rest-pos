package com.smartdata.resto_console.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.smartdata.resto_console.model.TablePicture;

import com.smartdata.resto_console.repository.TablePictureRepository;

@Service
public class TablePictureService {

    @Autowired
    private TablePictureRepository picRepository;

    public List<TablePicture> getTablePictures() {
        return picRepository.findTablePictures();
    }

}
