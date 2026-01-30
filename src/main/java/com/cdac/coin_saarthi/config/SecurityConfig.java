package com.cdac.coin_saarthi.config;

import org.springframework.context.annotation.Bean;
import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig{
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      
        http
        .cors(withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
            		.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(
                    "/api/auth/**",
                    "/swagger-ui/**",
                    "/crypto/**",   
                    "/v3/api-docs/**"
                ).permitAll()
                .anyRequest().authenticated()
             )
            .sessionManagement(session ->
            	session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .formLogin(form -> form.disable())   // 🚫 disable default login page
            .httpBasic(basic -> basic.disable()); // 🚫 disable basic auth

        return http.build();
    }
}
