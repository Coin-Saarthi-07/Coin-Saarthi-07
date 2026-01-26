package com.cdac.coin_saarthi.service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PriceHistory;
import com.cdac.coin_saarthi.repository.CryptoCurrencyRepository;
import com.cdac.coin_saarthi.repository.PriceHistoryRepository;

@Service
public class CryptoCurrencyServiceImpl implements CryptoCurrencyService {
	private final CryptoCurrencyRepository cryptoCurrencyRepository;
	private final PriceHistoryRepository priceHistoryRepository;
	
	public CryptoCurrencyServiceImpl(CryptoCurrencyRepository cryptoCurrencyRepository, PriceHistoryRepository priceHistoryRepository){
		this.cryptoCurrencyRepository=cryptoCurrencyRepository;
		this.priceHistoryRepository=priceHistoryRepository;
	}
	
	//1.add
	@Override
	public CryptoCurrency addCrypto(CryptoCurrency cryptoCurrency) {
		return cryptoCurrencyRepository.save(cryptoCurrency);
	}
	
	//2.get by id
	@Override
	public CryptoCurrency getById(Long cryptoId) {
		return cryptoCurrencyRepository.findById(cryptoId)
				.orElseThrow(()->new RuntimeException("Cryptocurrency of given id not found"));
	}

	//3.get by symbol
	@Override
	public CryptoCurrency getBySymbol(String symbol) {
		 return cryptoCurrencyRepository.findByCurrencySymbol(symbol)
	                .orElseThrow(()->new RuntimeException("CryptoCurrency not found with symbol"));
	}
	
	//4.get all cryptocurrency
	@Override
	public List<CryptoCurrency> getAllCryptoCurrency(){
		return cryptoCurrencyRepository.findAll();
	}
	
	//5.update
	@Override
	public CryptoCurrency updateCrypto(Long cryptoId, CryptoCurrency cryptoCurrency) {
		CryptoCurrency crypto = getById(cryptoId);
		if(crypto==null) {
			throw new RuntimeException("Cryptocurrency of given id not found");
		}
		crypto.setCurrencyName(cryptoCurrency.getCurrencyName());
		crypto.setCurrencySymbol(cryptoCurrency.getCurrencySymbol());
		crypto.setCurrencyPrice(cryptoCurrency.getCurrencyPrice());
		return cryptoCurrencyRepository.save(crypto);
	}
	
	//6.delete
	@Override
	public void deleteCrypto(Long cryptoId) {
		CryptoCurrency crypto = getById(cryptoId);
		if(crypto==null) {
			throw new RuntimeException("Cryptocurrency of given id not found");
		}
        cryptoCurrencyRepository.delete(crypto);
	}
	
	//7.search by symbol
	@Override
	public List<CryptoCurrency> searchCrypto(String keyword) {
        return cryptoCurrencyRepository
                .findByCurrencyNameContainingIgnoreCaseOrCurrencySymbolContainingIgnoreCase(keyword, keyword);
    }

	//8.top gainers
	@Override
	public List<Map<String, Object>> getTopGainers() {
		return calculateMovers(true);
	}

	//9.top losers
	@Override
	public List<Map<String, Object>> getTopLosers() {
		return calculateMovers(false);
	}
	
	//10.live prices
	@Override
	public List<Map<String, Object>> getLivePrices() {

	    return cryptoCurrencyRepository.findAll()
	            .stream()
	            .map(c -> {
	                Map<String, Object> map = new HashMap<>();
	                map.put("cryptoId", c.getCryptoId());
	                map.put("name", c.getCurrencyName());
	                map.put("symbol", c.getCurrencySymbol());
	                map.put("price", c.getCurrencyPrice());
	                return map;
	            })
	            .collect(Collectors.toList());
	}
	
	//11.price history
	@Override
	public List<PriceHistory> getPriceHistory(Long cryptoId) {
        return priceHistoryRepository.findByCryptoCurrency_CryptoIdOrderByRecordedTimeAsc(cryptoId);
	}
	
	//calculate movers
	private List<Map<String, Object>> calculateMovers(boolean gainers) {

	    return priceHistoryRepository.findAll()
	            .stream()
	            .collect(Collectors.groupingBy(
	                    p -> p.getCryptoCurrency().getCryptoId()))
	            .values()
	            .stream()
	            .map(list -> list.stream()
	                    .sorted(Comparator.comparing(PriceHistory::getRecordedTime).reversed())
	                    .limit(2)
	                    .toList())
	            .filter(list -> list.size() == 2)
	            .map(list -> {
	                double change = list.get(0).getPrice() - list.get(1).getPrice();

	                Map<String, Object> map = new HashMap<>();
	                map.put("cryptoId",
	                        list.get(0).getCryptoCurrency().getCryptoId());
	                map.put("priceChange", change);

	                return map;
	            })
	            .sorted((a, b) -> gainers
	                    ? Double.compare(
	                        (double) b.get("priceChange"),
	                        (double) a.get("priceChange"))
	                    : Double.compare(
	                        (double) a.get("priceChange"),
	                        (double) b.get("priceChange")))
	            .limit(10)
	            .toList();
	}


}
