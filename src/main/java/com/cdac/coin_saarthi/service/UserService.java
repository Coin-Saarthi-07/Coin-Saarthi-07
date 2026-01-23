package com.cdac.coin_saarthi.service;

import com.cdac.coin_saarthi.dto.UpdateDTO;
import com.cdac.coin_saarthi.repository.UserRepository;

import org.springframework.stereotype.Service;
import com.cdac.coin_saarthi.model.User;
import java.util.List;

@Service
public class UserService {


        private final UserRepository userRepository;

        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        // List all users
        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        // Get user by ID
        public User getUserById(Long id) {
            return userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User Not Found"));
        }

        // Delete user
        public void deleteUser(Long id) {
            User user = getUserById(id);
            userRepository.delete(user);
        }

        // Update user
        public void updateUser(Long id, UpdateDTO updateDTO) {

            User user = getUserById(id);

            if (userRepository.existsByUserNameAndUserIdNot(updateDTO.getUserName(), id)) {
                throw new RuntimeException("Username already exists!");
            }

            if (userRepository.existsByEmailAndUserIdNot(updateDTO.getEmail(), id)) {
                throw new RuntimeException("Email already exists!");
            }

            user.setUserName(updateDTO.getUserName());
            user.setEmail(updateDTO.getEmail());
            user.setPhoneNo(updateDTO.getPhoneNo());

            userRepository.save(user);
        }
    }


