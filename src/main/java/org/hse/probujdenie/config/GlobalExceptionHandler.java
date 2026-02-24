package org.hse.probujdenie.config;

import org.hse.probujdenie.api.model.BaseResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<BaseResponseDto> handleIllegalArgumentException(IllegalArgumentException ex) {
        BaseResponseDto response = new BaseResponseDto();
        response.setSuccess(false);
        response.addErrorsItem(ex.getMessage());
        return ResponseEntity.ok(response);
    }
}
