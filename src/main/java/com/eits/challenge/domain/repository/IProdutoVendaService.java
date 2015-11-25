package com.eits.challenge.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eits.challenge.domain.entity.Produto;
import com.eits.challenge.domain.entity.ProdutoVenda;
import com.eits.challenge.domain.entity.Venda;

public interface IProdutoVendaService extends JpaRepository<ProdutoVenda, Long> {
	
	public ProdutoVenda findByProduto(Produto produto);
	
	public List<ProdutoVenda> findByVenda(Venda venda);
	
	

}
