package com.nishberkay.nishcustomer.controller;

import com.nishberkay.nishcustomer.dto.request.CustomerAddRequestDto;
import com.nishberkay.nishcustomer.dto.request.CustomerUpdateRequestDto;
import com.nishberkay.nishcustomer.dto.response.CustomerResponseDto;
import com.nishberkay.nishcustomer.entity.mysqlentity.Customer;
import com.nishberkay.nishcustomer.exception.CustomerNotFoundException;
import com.nishberkay.nishcustomer.exception.InvalidRequestException;
import com.nishberkay.nishcustomer.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/customer")
@Validated
@CrossOrigin
public class CustomerController {


    private CustomerService customerService;
    private ModelMapper modelMapper;

    @Autowired
    public CustomerController(CustomerService customerService, ModelMapper modelMapper) {
        this.customerService = customerService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(params = "customerId")
    public ResponseEntity<CustomerResponseDto> findById(@RequestParam int customerId) throws CustomerNotFoundException {
        return ResponseEntity.ok(modelMapper.map(customerService.findById(customerId), CustomerResponseDto.class));
    }

    @GetMapping("/list")
    public ResponseEntity<List<CustomerResponseDto>> findAll() {

        List<Customer> customerList = customerService.findAll();
        return ResponseEntity.ok(customerList.stream().map(customer -> modelMapper.map(customer, CustomerResponseDto.class))
                .collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<CustomerResponseDto> addCustomer(@Valid @RequestBody CustomerAddRequestDto customerDto) {
        Customer customer;
        try {
            customer = modelMapper.map(customerDto, Customer.class);
            return ResponseEntity.ok(modelMapper.map(customerService.add(customer), CustomerResponseDto.class));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<CustomerResponseDto> updateCustomer(@Valid @RequestBody CustomerUpdateRequestDto customerDto,
                                                              BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
            throw new InvalidRequestException(errorMessage);
        }
        Customer customer = modelMapper.map(customerDto, Customer.class);
        return ResponseEntity.ok(modelMapper.map(customerService.update(customer), CustomerResponseDto.class));
    }

    @DeleteMapping("/{customerId}")
    public boolean delete(@PathVariable Integer customerId) throws CustomerNotFoundException {
        return customerService.delete(customerId);
    }
}
