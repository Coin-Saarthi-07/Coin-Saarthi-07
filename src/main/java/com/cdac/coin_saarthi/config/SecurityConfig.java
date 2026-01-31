package com.cdac.coin_saarthi.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter)
			throws Exception {

		http
				// ✅ ENABLE CORS (ONLY ONCE)
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))

				// ✅ DISABLE CSRF (JWT)
				.csrf(csrf -> csrf.disable())

				.authorizeHttpRequests(auth -> auth

						// ✅ Preflight
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

						// ✅ Swagger + Auth
						.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/auth/**").permitAll()

						// ✅ PUBLIC CRYPTO APIs (MATCH FRONTEND EXACTLY)
						.requestMatchers("/crypto/crypto-currency/**").permitAll()

						// ✅ Paper trading needs login
						.requestMatchers("/api/paper/**").authenticated()

						// ✅ Everything else secured
						.anyRequest().authenticated())

				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();

	    config.setAllowedOrigins(List.of("http://localhost:5173"));
	    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(List.of("*"));
	    config.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source =
	            new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);

	    return source;
	}


}
