package com.eits.challenge.domain.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import org.directwebremoting.annotations.DataTransferObject;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.envers.Audited;

import br.com.eits.common.domain.entity.AbstractEntity;

@Entity
@Audited
@DataTransferObject(javascript = "Cliente")
public class Cliente extends AbstractEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5837975441013880077L;

	@Column
	@NotNull
	private String nome;
	
	@Column
	private String apelido;
	
	@Column
	private String cidade;
	
	@Column
	private String uf;
	
	@Column
	private BigDecimal totalVendas;
	
	@Column
	private Boolean exclusaoBloqueada;
	
	
	
	public Cliente() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cliente(Long id) {
		super(id);
		// TODO Auto-generated constructor stub
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getApelido() {
		return apelido;
	}
	public void setApelido(String apelido) {
		this.apelido = apelido;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getUf() {
		return uf;
	}
	public void setUf(String uf) {
		this.uf = uf;
	}
	
	public BigDecimal getTotalVendas() {
		return totalVendas;
	}
	public void setTotalVendas(BigDecimal totalVendas) {
		this.totalVendas = totalVendas;
	}
	
	
	public Boolean getExclusaoBloqueada() {
		return exclusaoBloqueada;
	}
	public void setExclusaoBloqueada(Boolean exclusaoBloqueada) {
		this.exclusaoBloqueada = exclusaoBloqueada;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((apelido == null) ? 0 : apelido.hashCode());
		result = prime * result + ((cidade == null) ? 0 : cidade.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		result = prime * result + ((uf == null) ? 0 : uf.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cliente other = (Cliente) obj;
		if (apelido == null) {
			if (other.apelido != null)
				return false;
		} else if (!apelido.equals(other.apelido))
			return false;
		if (cidade == null) {
			if (other.cidade != null)
				return false;
		} else if (!cidade.equals(other.cidade))
			return false;
		if (nome == null) {
			if (other.nome != null)
				return false;
		} else if (!nome.equals(other.nome))
			return false;
		if (uf == null) {
			if (other.uf != null)
				return false;
		} else if (!uf.equals(other.uf))
			return false;
		return true;
	}
	
}
