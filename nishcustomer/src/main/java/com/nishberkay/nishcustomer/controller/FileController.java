package com.nishberkay.nishcustomer.controller;

import com.nishberkay.nishcustomer.dto.request.FileAddRequestDto;
import com.nishberkay.nishcustomer.dto.request.FileUpdateRequestDto;
import com.nishberkay.nishcustomer.dto.response.FileListResponseDto;
import com.nishberkay.nishcustomer.entity.postgresentity.File;
import com.nishberkay.nishcustomer.exception.CustomerNotFoundException;
import com.nishberkay.nishcustomer.exception.FileNotFoundException;
import com.nishberkay.nishcustomer.service.FileService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/file")
@CrossOrigin
public class FileController {

    private FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<File>> getFilesByUserId(@RequestParam("userId") Integer userId) throws CustomerNotFoundException {
        return ResponseEntity.ok(fileService.getAllFilesByUserId(userId));
    }

    @GetMapping("/fileInfoList")
    public ResponseEntity<List<FileListResponseDto>> getAllFileInfo() {
        return ResponseEntity.ok(fileService.getAllFileInfo());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<File> uploadFile(@ModelAttribute @RequestBody FileAddRequestDto request) throws IOException, CustomerNotFoundException {
        return ResponseEntity.ok(fileService.uploadFile(request));
    }

    @PutMapping
    public ResponseEntity<File> updateFile(@ModelAttribute @Valid FileUpdateRequestDto request) throws FileNotFoundException, IOException, CustomerNotFoundException {
        return ResponseEntity.ok(fileService.updateFile(request));
    }

    @DeleteMapping("/{fileId}")
    public boolean delete(@PathVariable Integer fileId) throws CustomerNotFoundException {
        return fileService.delete(fileId);
    }


}
