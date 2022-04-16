package com.nishberkay.nishcustomer.service;

import com.nishberkay.nishcustomer.entity.mysqlentity.Customer;
import com.nishberkay.nishcustomer.exception.CustomerNotFoundException;
import com.nishberkay.nishcustomer.repository.mysqlrepository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @PostConstruct
    public void initializeSomeCustomersAndStoreDb() {
        List<Customer> custList = customerRepository.findCustomerByFirstNameAndAndLastName("testName0", "testSurname0");
        if(custList.isEmpty()) {
            for (int x = 0; x < 5; x++) {
                String testName = "testName" + x;
                String testSurname = "testSurname" + x;
                customerRepository.save(new Customer(testName, testSurname));
                System.out.println("Sample customer is created on initializatiion as: " + testName + " " + testSurname);
            }
        }
    }


    public Customer add(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer findById(int customerId) throws CustomerNotFoundException {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("There is no customer with id: " + customerId));
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Customer update(Customer customer) throws Exception {
        customerRepository.findById(customer.getId())
                .orElseThrow(() -> new CustomerNotFoundException("There is no customer with id: " + customer.getId()));
        return customerRepository.save(customer);
    }

    public boolean delete(int customerId) throws CustomerNotFoundException {
        customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("There is no customer with id: " + customerId));
        customerRepository.deleteById(customerId);
        return true;
    }
}
