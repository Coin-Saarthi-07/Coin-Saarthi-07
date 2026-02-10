
package com.cdac.coin_saarthi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class AccessDeniedCustomException extends RuntimeException {

    public AccessDeniedCustomException(String message) {
        super(message);
    }
}