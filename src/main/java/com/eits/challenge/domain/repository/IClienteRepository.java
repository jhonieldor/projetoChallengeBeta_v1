package com.eits.challenge.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eits.challenge.domain.entity.Cliente;

public interface IClienteRepository extends JpaRepository<Cliente, Long>{
	
	
}
