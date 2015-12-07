package com.eits.challenge.domain.controller;

import com.eits.challenge.domain.entity.CurrentUser;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class CurrentUserController {


    @ModelAttribute("currentUser")
    public CurrentUser getCurrentUserAdvice(Authentication authentication) {


        return (authentication == null) ? null : (CurrentUser) authentication.getPrincipal();
    }
}
