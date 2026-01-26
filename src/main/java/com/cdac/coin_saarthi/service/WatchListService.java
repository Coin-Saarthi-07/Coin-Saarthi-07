package com.cdac.coin_saarthi.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.dto.CreateWatchListDto;
import com.cdac.coin_saarthi.dto.WatchListResponseDto;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.User;
import com.cdac.coin_saarthi.model.WatchList;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.UserRepository;
import com.cdac.coin_saarthi.repository.WatchListRepository;

@Service
public class WatchListService {

    private final WatchListRepository watchListRepository;
    private final UserRepository userRepository;
    private final CryptoCurrencyRepository cryptoRepository;

    public WatchListService(
            WatchListRepository watchListRepository,
            UserRepository userRepository,
            CryptoCurrencyRepository cryptoRepository) {
        this.watchListRepository = watchListRepository;
        this.userRepository = userRepository;
        this.cryptoRepository = cryptoRepository;
    }

    public List<WatchListResponseDto> getAll() {
        return watchListRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<WatchListResponseDto> getByUserId(Long userId) {
        return watchListRepository.findByUser_UserId(userId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public boolean create(CreateWatchListDto dto) {

        boolean exists = watchListRepository
                .existsByUser_UserIdAndCryptoCurrency_CryptoId(
                        dto.getUserId(), dto.getCryptoId());

        if (exists) return false;

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CryptoCurrency crypto = cryptoRepository.findById(dto.getCryptoId())
                .orElseThrow(() -> new RuntimeException("Crypto not found"));

        WatchList watchList = new WatchList();
        watchList.setUser(user);
        watchList.setCryptoCurrency(crypto);
        watchList.setAddedOn(LocalDateTime.now());

        watchListRepository.save(watchList);
        return true;
    }

    public boolean delete(Long watchListId) {
        if (!watchListRepository.existsById(watchListId)) return false;
        watchListRepository.deleteById(watchListId);
        return true;
    }

    private WatchListResponseDto mapToDto(WatchList w) {
        WatchListResponseDto dto = new WatchListResponseDto();
        dto.setWatchListId(w.getWatchListId());
        dto.setCryptoId(w.getCryptoCurrency().getCryptoId());
        dto.setCurrencyName(w.getCryptoCurrency().getCurrencyName());
        dto.setSymbol(w.getCryptoCurrency().getCurrencySymbol());
        dto.setCurrencyPrice(w.getCryptoCurrency().getCurrencyPrice());
        dto.setAddedOn(w.getAddedOn());
        return dto;
    }

}
