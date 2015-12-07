/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eits.challenge.domain.service;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eits.challenge.domain.entity.CurrentUser;
import com.eits.challenge.domain.entity.Usuario;
import com.eits.challenge.domain.mail.MailSender;
import com.eits.challenge.domain.repository.IUsuarioRepository;

/**
 *
 * @author jhoni
 */

@Service
@Transactional
@RemoteProxy(name="usuarioService")
public class UsuarioService implements UserDetailsService{

	@Autowired
	private IUsuarioRepository usuarioRespository;


	public void salvarUsuario(Usuario usuario){
		usuario.setAtivo(true);
		usuario.setPerfil(usuario.getPerfil().trim());
		Boolean enviarEmail = false;
		if(usuario.getId()==null){
			enviarEmail = true;
		}

		if(usuario.getPerfil().equals("Administrador")){
			usuario.setRole("ROLE_ADMIN");
		}else {
			usuario.setRole("ROLE_USER");
		}


		usuarioRespository.save(usuario);

		if(enviarEmail){
			String assunto = "Sistema de Controle de Vendas";
			String mensagem = "Bem vindo ao Sistema de Controle de Vendas \n\n "
					+ "Segue baixo os dados para acesso ao sistema: " 
					+ "\n\nLogin: " + usuario.getLogin()
					+ "\nSenha: " + usuario.getSenha();

			Thread emailThread = new Thread(new MailSender(usuario.getEmail(), mensagem, assunto));
			emailThread.start();
		}
	}


	public void desativarUsuario(Usuario usuario){
		usuario.setAtivo(false);
		usuarioRespository.save(usuario);
	}

	public void ativarUsuario(Usuario usuario){
		usuario.setAtivo(true);
		usuarioRespository.save(usuario);
	}

	@Transactional(readOnly=true)
	public List<Usuario> listarUsuarios(){
		return usuarioRespository.findAll();
	}


	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {


		Usuario user;
		try {
			user = usuarioRespository.findByLogin(login);
		} catch (Exception ex) {
			throw new UsernameNotFoundException("Nenhum usuário encontrado com o login informado");
		}

		return new CurrentUser(user);

	}
}
