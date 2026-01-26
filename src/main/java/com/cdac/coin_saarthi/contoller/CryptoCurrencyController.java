package com.cdac.coin_saarthi.contoller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.coin_saarthi.dto.ApiResponseDTO;
import com.cdac.coin_saarthi.model.CryptoCurrency;
import com.cdac.coin_saarthi.service.CryptoCurrencyService;

@RestController
@RequestMapping("/crypto/crypto-currency")
public class CryptoCurrencyController {
	private final CryptoCurrencyService cryptoCurrencyService;
	
	public CryptoCurrencyController(CryptoCurrencyService cryptoCurrencyService) {
		this.cryptoCurrencyService = cryptoCurrencyService;
	}
	
	//1. add cryptocurrency
	@PostMapping
	public ResponseEntity<?> addCrypto(@RequestBody CryptoCurrency cryptoCurrency){
		cryptoCurrencyService.addCrypto(cryptoCurrency);
		return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO("Crypto added Succesfully", "Success"));
	}
	
	//2. get all cryptocurrency
	@GetMapping
	public ResponseEntity<List<CryptoCurrency>> getAllCryptoCurrency(){
		return ResponseEntity.ok(cryptoCurrencyService.getAllCryptoCurrency());
	}
	
	//3. get by id
	@GetMapping("/{id}")
	public ResponseEntity<CryptoCurrency> getById(@PathVariable Long id) {
		return ResponseEntity.ok(cryptoCurrencyService.getById(id));
	}
	
	//4.get by symbol
	@GetMapping("/symbol/{symbol}")
	public ResponseEntity<CryptoCurrency> getBySymbol(@PathVariable String symbol){
		return ResponseEntity.ok(cryptoCurrencyService.getBySymbol(symbol));
	}
	
	//5.update 
	@PutMapping("/{id}")
    public ResponseEntity<CryptoCurrency> updateCrypto(@PathVariable Long id,@RequestBody CryptoCurrency cryptoCurrency){
		return ResponseEntity.ok(cryptoCurrencyService.updateCrypto(id, cryptoCurrency));
    }

    //6. delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCrypto(@PathVariable Long id){
		cryptoCurrencyService.deleteCrypto(id);
        return ResponseEntity.ok("User deleted successfully");
    }
    
    //7.search by symbol
    @GetMapping("/search")
    public ResponseEntity<?> searchCryptoBySymbol(@RequestParam String keyword){
        if (keyword==null || keyword.isBlank()) {
            return ResponseEntity.badRequest().body("Search keyword is required");
        }
        return ResponseEntity.ok(cryptoCurrencyService.searchCrypto(keyword));
    }
    
    //8. Top gainers
    @GetMapping("/top-gainers")
    public ResponseEntity<?> topGainers(){
        return ResponseEntity.ok(cryptoCurrencyService.getTopGainers());
    }

    //9. Top losers
    @GetMapping("/top-losers")
    public ResponseEntity<?> topLosers(){
        return ResponseEntity.ok(cryptoCurrencyService.getTopLosers());
    }

    //10. live prices
    @GetMapping("/live")
    public ResponseEntity<?> livePrices(){
    	return ResponseEntity.ok(cryptoCurrencyService.getLivePrices());
    }

    //11. price history
    @GetMapping("/history/{cryptoId}")
    public ResponseEntity<?> priceHistory(@PathVariable Long cryptoId){
        return ResponseEntity.ok(cryptoCurrencyService.getPriceHistory(cryptoId));
    }
}
