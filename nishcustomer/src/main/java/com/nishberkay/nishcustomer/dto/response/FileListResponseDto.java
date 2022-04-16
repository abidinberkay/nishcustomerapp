package com.nishberkay.nishcustomer.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Builder
@Data
public class FileListResponseDto {
    private Integer id;
    private Integer userId;
    private Integer customerId;
    private String fileName;
    private Date lastModifiedDate;
}
