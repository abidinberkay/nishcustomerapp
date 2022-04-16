package com.nishberkay.nishcustomer.service;

import com.nishberkay.nishcustomer.dto.request.FileAddRequestDto;
import com.nishberkay.nishcustomer.dto.request.FileUpdateRequestDto;
import com.nishberkay.nishcustomer.dto.response.FileListResponseDto;
import com.nishberkay.nishcustomer.entity.postgresentity.File;
import com.nishberkay.nishcustomer.exception.CustomerNotFoundException;
import com.nishberkay.nishcustomer.exception.FileNotFoundException;
import com.nishberkay.nishcustomer.repository.mysqlrepository.CustomerRepository;
import com.nishberkay.nishcustomer.repository.postgresrepository.FileRepository;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FileService {

    private FileRepository fileRepository;
    private CustomerRepository customerRepository;

    @Autowired
    public FileService(FileRepository fileRepository, CustomerRepository customerRepository) {
        this.fileRepository = fileRepository;
        this.customerRepository = customerRepository;
    }

    @PostConstruct
    public void initializeSomeFilesAndStoreDb() {

        //If there is no data on db, add some for once
        String testFileName = "TestFile.txt";

        List<File> files = fileRepository.getFilesByName(testFileName);
        if (files.isEmpty()) {
            for (int x = 0; x < 5; x++) {
                MultipartFile testFile = new MockMultipartFile("TestFile.txt",
                        "TestFile.txt",
                        "text/plain",
                        "This is a dummy file for initialization".getBytes(StandardCharsets.UTF_8));
                fileRepository.save(File.builder()
                        .name(testFile.getOriginalFilename())
                        .type(testFile.getContentType())
                        .customerId(x)
                        .userId(x)
                        .creationDate(new Date(System.currentTimeMillis()))
                        .data(RandomUtils.nextBytes(20))
                        .build());
            }
        }

    }

    public File getFileById(int fileId) throws FileNotFoundException {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("There is no file with id: " + fileId));
    }

    public List<FileListResponseDto> getAllFileInfo() {
        List<File> fileList = fileRepository.findAll();
        List<FileListResponseDto> responseList = new ArrayList<>();

        fileList.forEach(file -> {
            responseList.add(FileListResponseDto.builder()
                    .id(file.getId())
                    .fileName(file.getName())
                    .lastModifiedDate(file.getCreationDate())
                    .customerId(file.getCustomerId())
                    .userId(file.getUserId())
                    .build());
        });
        return responseList;
    }

    public List<File> getAllFilesByUserId(int userId) throws CustomerNotFoundException {
        isCustomerExist(userId);
        return fileRepository.getAllByUserId(userId);
    }

    @Transactional
    public File uploadFile(FileAddRequestDto addRequestDto) throws IOException, CustomerNotFoundException {

        isCustomerExist(addRequestDto.getCustomerId());

        File file = File.builder()
                .customerId(addRequestDto.getCustomerId())
                .userId(addRequestDto.getUserId())
                .name(addRequestDto.getFile().getOriginalFilename())
                .creationDate(new Date(System.currentTimeMillis()))
                .type(addRequestDto.getFile().getContentType())
                .data(addRequestDto.getFile().getBytes())
                .build();

        return fileRepository.save(file);
    }

    @Transactional
    public File updateFile(FileUpdateRequestDto requestDto) throws CustomerNotFoundException, FileNotFoundException, IOException {

        isCustomerExist(requestDto.getUserId());

        fileRepository.findById(requestDto.getId())
                .orElseThrow(() -> new FileNotFoundException("There is no file with id: " + requestDto.getId()));

        File file = File.builder()
                .id(requestDto.getId())
                .customerId(requestDto.getCustomerId())
                .userId(requestDto.getUserId())
                .name(requestDto.getMultipartFile().getName())
                .creationDate(new Date(System.currentTimeMillis()))
                .type(requestDto.getMultipartFile().getContentType())
                .data(requestDto.getMultipartFile().getBytes())
                .build();

        return fileRepository.save(file);

    }

    public boolean delete(int fileId) throws CustomerNotFoundException {
        fileRepository.findById(fileId)
                .orElseThrow(() -> new CustomerNotFoundException("There is no file with id: " + fileId));
        fileRepository.deleteById(fileId);
        return true;
    }

    private void isCustomerExist(int userId) throws CustomerNotFoundException {
        customerRepository.findById(userId)
                .orElseThrow(() -> new CustomerNotFoundException("There is no customer with id: " + userId));
    }

}
