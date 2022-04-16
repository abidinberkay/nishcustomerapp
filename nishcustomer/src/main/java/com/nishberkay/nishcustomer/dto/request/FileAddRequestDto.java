package com.nishberkay.nishcustomer.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class FileAddRequestDto {

    @NotNull
    private Integer userId;

    @NotNull
    private Integer customerId;

    @NotNull
    private MultipartFile file;

}
