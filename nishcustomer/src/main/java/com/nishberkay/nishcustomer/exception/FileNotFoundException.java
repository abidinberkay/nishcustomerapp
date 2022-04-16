package com.nishberkay.nishcustomer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class FileNotFoundException extends Exception {

    public FileNotFoundException(String errorMessage) {
        super(errorMessage);
    }

}
