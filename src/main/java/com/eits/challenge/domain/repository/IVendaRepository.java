package com.eits.challenge.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eits.challenge.domain.entity.Venda;

public interface IVendaRepository extends JpaRepository<Venda , Long> {

	@Query(value="SELECT v FROM Venda v ORDER BY v.dataVenda DESC")
	public List<Venda> findOrderByDataDesc();
	
}
