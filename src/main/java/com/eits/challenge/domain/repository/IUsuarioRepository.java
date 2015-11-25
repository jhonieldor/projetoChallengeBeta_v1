package com.eits.challenge.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.eits.challenge.domain.entity.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long>{

	
	
}
