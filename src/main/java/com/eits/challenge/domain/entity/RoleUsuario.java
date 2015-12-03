package com.eits.challenge.domain.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
import org.hibernate.envers.Audited;

import br.com.eits.common.domain.entity.AbstractEntity;

@Entity
@Audited
@Table(name = "authorities")
@DataTransferObject(javascript="Authority")
public class RoleUsuario extends AbstractEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6479590696735568487L;
	
	@ManyToOne
	@JoinColumn(name="login")
	private Usuario usuario;
	
	@Column(name="role")
	private String role;
	

	public RoleUsuario() {
		super();
	}


	public Usuario getUsuario() {
		return usuario;
	}


	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}
	
	
}
