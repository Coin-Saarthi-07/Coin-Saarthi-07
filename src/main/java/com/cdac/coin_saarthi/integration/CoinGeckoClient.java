package com.cdac.coin_saarthi.integration;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class CoinGeckoClient {

	private static final String TOP_100_URL = "https://api.coingecko.com/api/v3/coins/markets" + "?vs_currency=usd"
			+ "&order=market_cap_desc" + "&per_page=100" + "&page=1";

	private final RestTemplate restTemplate = new RestTemplate();

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> fetchTop100Coins() {
		return restTemplate.getForObject(TOP_100_URL, List.class);
	}

	public Double fetchUsdPrice(String coinGeckoId) {

		try {
			String url = TOP_100_URL + "?ids=" + coinGeckoId + "&vs_currencies=usd";

			Map<String, Object> response = restTemplate.getForObject(url, Map.class);

			if (response == null || !response.containsKey(coinGeckoId)) {
				return null;
			}

			Map<String, Object> data = (Map<String, Object>) response.get(coinGeckoId);

			Object usd = data.get("usd");
			if (usd == null) {
				return null;
			}

			return ((Number) usd).doubleValue();

		} catch (Exception e) {
			return null; // VERY IMPORTANT
		}
	}

}
