package com.nishberkay.nishcustomer.entity;

import lombok.Data;

import javax.persistence.Id;

@Data
public class User {

    @Id
    private Long id;
    private String password;

}
