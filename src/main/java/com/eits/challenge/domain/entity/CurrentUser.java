package com.eits.challenge.domain.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class CurrentUser extends User {

	private Usuario user;

	public CurrentUser(Usuario usuario) {
		super(usuario.getLogin(), usuario.getSenha(), AuthorityUtils.createAuthorityList(usuario.getRole()));
		this.user =  usuario;
	}

	public Usuario getUser() {
		return user;
	}

	public Long getId() {
		return user.getId();
	}

	public String getPerfil() {
		return user.getPerfil();
	}


}
