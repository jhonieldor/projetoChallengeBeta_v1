package com.eits.challenge.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eits.challenge.domain.entity.Usuario;
import com.eits.challenge.domain.entity.Venda;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long>{

	public Usuario findByLogin(String login);
	
}
