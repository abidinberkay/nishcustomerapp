package com.nishberkay.nishcustomer.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CustomerUpdateRequestDto {

    @NotNull
    private Integer id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;
}
