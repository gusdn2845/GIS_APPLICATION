package com.example.gis_app.controller;

import com.example.gis_app.lib.FileHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Controller
public class FileController {
    @Value("${spring.servlet.multipart.location}") // application 의 properties 의 변수
    private String UPLOAD_PATH;
    @PostMapping("/fileUpload")
    @ResponseBody
    public String fileUpload(HttpServletRequest req, @RequestParam("file") MultipartFile file) throws IOException {
        String path = req.getServletContext().getRealPath(UPLOAD_PATH);
        String fileName = file.getOriginalFilename();
        String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
        File dir = new File(path);

        if(!FileHandler.exist(dir)){
            FileHandler.createFolder(dir, false);
        }

        String uploadFileName = UUID.randomUUID() + "." + fileExt;
        File uploadFile = new File(path + "/" + uploadFileName);
        file.transferTo(uploadFile);

        return uploadFileName;
    }
}
