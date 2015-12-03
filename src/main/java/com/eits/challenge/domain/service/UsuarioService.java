/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eits.challenge.domain.service;

import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eits.challenge.domain.entity.Usuario;
import com.eits.challenge.domain.repository.IUsuarioRepository;

/**
 *
 * @author jhoni
 */

@Service
@Transactional
@RemoteProxy(name="usuarioService")
public class UsuarioService {

	@Autowired
	private IUsuarioRepository usuarioRespository;


	public void salvarUsuario(Usuario usuario){
		if(usuario.getId()==null){
			enviarEmail();
		}

		usuarioRespository.save(usuario);
	}

	public void desativarUsuario(Usuario usuario){
		usuario.setAtivo(false);
		usuarioRespository.save(usuario);
	}

	public void ativarUsuario(Usuario usuario){
		usuario.setAtivo(true);
		usuarioRespository.save(usuario);
	}

	public void enviarEmail(){

	}
}
