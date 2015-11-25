package com.eits.challenge.domain.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.directwebremoting.annotations.DataTransferObject;
import org.hibernate.envers.Audited;
import org.hibernate.validator.constraints.Length;

import br.com.eits.common.domain.entity.AbstractEntity;

@Entity
@Audited
@DataTransferObject(javascript="Produto")
public class Produto extends AbstractEntity implements Serializable  {
	/**
	 * 
	 */
	private static final long serialVersionUID = -786955184661554651L;

	@Column
	private String descricao;
	
	@Column
	private BigDecimal valorUnitario;
	
	@Column
	private Boolean produtoVendido;
	
	@Column(length=50)
	private String marca;
	
	@Column
	private Integer saldoEstoque;

	public Produto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public BigDecimal getValorUnitario() {
		return valorUnitario;
	}

	public void setValorUnitario(BigDecimal valorUnitario) {
		this.valorUnitario = valorUnitario;
	}

	public Boolean getProdutoVendido() {
		return produtoVendido;
	}

	public void setProdutoVendido(Boolean produtoVendido) {
		this.produtoVendido = produtoVendido;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public Integer getSaldoEstoque() {
		return saldoEstoque;
	}

	public void setSaldoEstoque(Integer saldoEstoque) {
		this.saldoEstoque = saldoEstoque;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((descricao == null) ? 0 : descricao.hashCode());
		result = prime * result + ((produtoVendido == null) ? 0 : produtoVendido.hashCode());
		result = prime * result + ((valorUnitario == null) ? 0 : valorUnitario.hashCode());
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
		Produto other = (Produto) obj;
		if (descricao == null) {
			if (other.descricao != null)
				return false;
		} else if (!descricao.equals(other.descricao))
			return false;
		if (produtoVendido == null) {
			if (other.produtoVendido != null)
				return false;
		} else if (!produtoVendido.equals(other.produtoVendido))
			return false;
		if (valorUnitario == null) {
			if (other.valorUnitario != null)
				return false;
		} else if (!valorUnitario.equals(other.valorUnitario))
			return false;
		return true;
	}
	
	
}
