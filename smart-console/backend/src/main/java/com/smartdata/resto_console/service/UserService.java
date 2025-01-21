package com.smartdata.resto_console.service;

import com.smartdata.resto_console.model.User;
import com.smartdata.resto_console.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> findByPinCode(String rawPincode) {
        return userRepository.findAll().stream()
                .filter(user -> passwordEncoder.matches(rawPincode, user.getPassword()))
                .findFirst();
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

