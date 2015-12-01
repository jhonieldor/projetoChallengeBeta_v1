package com.eits.challenge.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.eits.challenge.domain.entity.Produto;
import com.eits.challenge.domain.entity.ProdutoVenda;
import com.eits.challenge.domain.entity.Venda;

public interface IProdutoVendaService extends JpaRepository<ProdutoVenda, Long> {
	
	public ProdutoVenda findByProduto(Produto produto);
	
        
        @Query(value="SELECT p FROM ProdutoVenda p Where p.venda = :venda")
	public List<ProdutoVenda> findByVenda(@Param("venda") Venda venda);
	
	

}
