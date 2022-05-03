package com.nishberkay.nishcustomer.service;

import com.nishberkay.nishcustomer.repository.mysqlrepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {

        com.nishberkay.nishcustomer.entity.mysqlentity.User userFromRepo = userRepository.findByUsername(username);

        return new User(userFromRepo.getUsername(), userFromRepo.getPassword(), new ArrayList<>());

    }
}