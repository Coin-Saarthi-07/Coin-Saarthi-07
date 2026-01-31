package com.cdac.coin_saarthi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.UpdateDTO;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.service.UserService;

import jakarta.annotation.security.PermitAll;

@RestController
@RequestMapping("/crypto/admin")
@PreAuthorize("hasAnyAuthority('ADMIN')")
public class UserController {

        private final UserService userService;

        public UserController(UserService userService) {
            this.userService = userService;
        }

        // List all users
        @GetMapping
        public ResponseEntity<List<User>> getAllUsers() {
            return ResponseEntity.ok(userService.getAllUsers());
        }

        // Get user by ID
        @GetMapping("/{id}")
        public ResponseEntity<User> getUserById(@PathVariable Long id) {
            return ResponseEntity.ok(userService.getUserById(id));
        }

        // Delete user
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteUser(@PathVariable Long id) {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        }


        //update
        @PutMapping("/{id}")
        public ResponseEntity<String> updateUser(
                @PathVariable Long id,
                @RequestBody UpdateDTO updateDTO) {

            userService.updateUser(id, updateDTO);
            return ResponseEntity.ok("User details updated successfully!!");
        }
    }


