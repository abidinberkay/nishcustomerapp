package com.nishberkay.nishcustomer.dto.request;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class CustomerAddRequestDto {

    @Size(min = 2)
    private String firstName;

    @Size(min = 2)
    private String lastName;
}
