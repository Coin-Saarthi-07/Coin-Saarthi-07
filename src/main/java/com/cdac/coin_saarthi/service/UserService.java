package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.dto.UpdateDTO;
import com.cdac.coin_saarthi.model.User;

public interface UserService {
	//get all
	List<User> getAllUsers();
	//get by id
	User getUserById(Long id);
	//delete
	void deleteUser(Long id);
	//update
	void updateUser(Long id, UpdateDTO updateDTO);
}
