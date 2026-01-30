package com.cdac.coin_saarthi.service;

import java.util.List;

import com.cdac.coin_saarthi.dto.CreateWatchListDto;
import com.cdac.coin_saarthi.dto.WatchListResponseDto;

public interface WatchListService{
	List<WatchListResponseDto> getAll();
	List<WatchListResponseDto> getByUserId(Long userId);
	boolean create(CreateWatchListDto dto);
	boolean delete(Long watchListId);
}
