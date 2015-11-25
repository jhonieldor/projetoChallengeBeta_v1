package com.eits.challenge.domain.entity;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.directwebremoting.annotations.DataTransferObject;
import org.hibernate.envers.Audited;

import br.com.eits.common.domain.entity.AbstractEntity;

@Entity
@Audited
@DataTransferObject(javascript="Venda")
public class Venda extends AbstractEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6358607431382694046L;

	@OneToMany
	private Set<ProdutoVenda> produtos;
	
	private Calendar dataVenda;
	
	private BigDecimal valorTotal;
	
	private Boolean estornada;
	
	@OneToOne
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;
	
	@OneToOne
	@JoinColumn(name= "usuario_id")
	private Usuario usuario;

	public Set<ProdutoVenda> getProdutos() {
		return produtos;
	}

	public void setProdutos(Set<ProdutoVenda> produtos) {
		this.produtos = produtos;
	}

	public Calendar getDataVenda() {
		return dataVenda;
	}

	public void setDataVenda(Calendar dataVenda) {
		this.dataVenda = dataVenda;
	}

	public BigDecimal getValorTotal() {
		return valorTotal;
	}

	public void setValorTotal(BigDecimal valorTotal) {
		this.valorTotal = valorTotal;
	}

	public Boolean getEstornada() {
		return estornada;
	}

	public void setEstornada(Boolean estornada) {
		this.estornada = estornada;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((cliente == null) ? 0 : cliente.hashCode());
		result = prime * result + ((dataVenda == null) ? 0 : dataVenda.hashCode());
		result = prime * result + ((estornada == null) ? 0 : estornada.hashCode());
		result = prime * result + ((produtos == null) ? 0 : produtos.hashCode());
		result = prime * result + ((usuario == null) ? 0 : usuario.hashCode());
		result = prime * result + ((valorTotal == null) ? 0 : valorTotal.hashCode());
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
		Venda other = (Venda) obj;
		if (cliente == null) {
			if (other.cliente != null)
				return false;
		} else if (!cliente.equals(other.cliente))
			return false;
		if (dataVenda == null) {
			if (other.dataVenda != null)
				return false;
		} else if (!dataVenda.equals(other.dataVenda))
			return false;
		if (estornada == null) {
			if (other.estornada != null)
				return false;
		} else if (!estornada.equals(other.estornada))
			return false;
		if (produtos == null) {
			if (other.produtos != null)
				return false;
		} else if (!produtos.equals(other.produtos))
			return false;
		if (usuario == null) {
			if (other.usuario != null)
				return false;
		} else if (!usuario.equals(other.usuario))
			return false;
		if (valorTotal == null) {
			if (other.valorTotal != null)
				return false;
		} else if (!valorTotal.equals(other.valorTotal))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Venda [produtos=" + produtos + ", dataVenda=" + dataVenda + ", valorTotal=" + valorTotal
				+ ", estornada=" + estornada + ", cliente=" + cliente + ", usuario=" + usuario + "]";
	}
	
	
	
	
	

	
}
