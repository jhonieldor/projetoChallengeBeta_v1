package com.eits.challenge.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eits.challenge.domain.entity.Produto;

public interface IProdutoRepository extends JpaRepository<Produto, Long> {

}
