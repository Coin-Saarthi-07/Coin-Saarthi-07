package com.cdac.coin_saarthi.service;

import java.util.List;
import java.util.Map;

import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.model.PriceHistory;

public interface CryptoCurrencyService{
	//1.add crypto
	CryptoCurrency addCrypto(CryptoCurrency cryptoCurrency);
	
	//2.get by id
    CryptoCurrency getById(Long cryptoId);

    //3.get by symbol
    CryptoCurrency getBySymbol(String symbol);
    
    //4.get all crypto
    List<CryptoCurrency> getAllCryptoCurrency();
    
    //5.update crypto
    CryptoCurrency updateCrypto(Long cryptoId, CryptoCurrency cryptoCurrency);

    //6.delete crypto
    void deleteCrypto(Long cryptoId);
	
	//7.search by symbol
	List<CryptoCurrency> searchCrypto(String keyword);
	
	//8.top gainers
	List<Map<String, Object>> getTopGainers();
	
	//9. top losers
	List<Map<String, Object>> getTopLosers();
	
	//10. get live prices
	List<Map<String, Object>> getLivePrices();
	
	//11. price history
	List<PriceHistory> getPriceHistory(Long cryptoId);

}
