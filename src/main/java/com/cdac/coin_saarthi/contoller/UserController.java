package com.cdac.coin_saarthi.contoller;

import com.cdac.coin_saarthi.dto.UpdateDTO;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/crypto/admin")


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


        @PutMapping("/{id}")
        public ResponseEntity<String> updateUser(
                @PathVariable Long id,
                @RequestBody UpdateDTO updateDTO) {

            userService.updateUser(id, updateDTO);
            return ResponseEntity.ok("User details updated successfully!!");
        }
    }


