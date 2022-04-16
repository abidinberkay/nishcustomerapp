package com.nishberkay.nishcustomer.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class FileUpdateRequestDto {

    @NotNull
    private Integer id;

    @NotNull
    private Integer userId;

    @NotNull
    private Integer customerId;

    @NotNull
    private MultipartFile multipartFile;
}
