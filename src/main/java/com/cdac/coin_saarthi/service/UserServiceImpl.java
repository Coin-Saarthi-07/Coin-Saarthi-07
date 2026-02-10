package com.cdac.coin_saarthi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.dto.UpdateDTO;
import com.cdac.coin_saarthi.enums.UserStatus;
import com.cdac.coin_saarthi.exception.ResourceNotFoundException;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{


        private final UserRepository userRepository;

        public UserServiceImpl(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        // List all users
        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        // Get user by ID
        public User getUserById(Long id) {
            return userRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
        }

        // Delete user
        public void deleteUser(Long id) {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
            user.setStatus(UserStatus.BLOCKED);
            userRepository.save(user);
        }

        // Update user
        public void updateUser(Long id, UpdateDTO updateDTO) {

            User user = getUserById(id);

            if (userRepository.existsByUserNameAndUserIdNot(updateDTO.getUserName(), id)) {
                throw new ResourceNotFoundException("Username already exists!");
            }

            if (userRepository.existsByEmailAndUserIdNot(updateDTO.getEmail(), id)) {
                throw new ResourceNotFoundException("Email already exists!");
            }

            user.setUserName(updateDTO.getUserName());
            user.setEmail(updateDTO.getEmail());
            user.setPhoneNo(updateDTO.getPhoneNo());
            user.setDob(updateDTO.getDob());
            

            userRepository.save(user);
        }
    }


