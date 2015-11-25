package com.eits.challenge.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eits.challenge.domain.entity.Venda;

public interface IVendaRepository extends JpaRepository<Venda , Long> {

}
