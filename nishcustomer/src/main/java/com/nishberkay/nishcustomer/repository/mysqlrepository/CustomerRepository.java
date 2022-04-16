package com.nishberkay.nishcustomer.repository.mysqlrepository;

import com.nishberkay.nishcustomer.entity.mysqlentity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findCustomerByFirstNameAndAndLastName(String firstName, String lastName);


}
