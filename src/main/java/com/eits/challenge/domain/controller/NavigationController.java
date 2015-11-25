package com.eits.challenge.domain.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * @author rodrigo
 */
@Controller
public class NavigationController
{
	
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping("/")
	public ModelAndView home()
	{
		//this.authenticate();
		return new ModelAndView( "app/index.jsp" );
	}
	
	/**
	 * 
	 * @param customer
	 * @return
	 */
	/*private void authenticate() {
		System.out.println( "asdfas" );
		final Usuario usuario = this.usuarioResourceDelegate.findPrincipal();

		if (usuario.getAuthorities() == null || usuario.getAuthorities().equals(null) || usuario.getAuthorities().size() == 0) {
			throw new AccessDeniedException("Usuário não vinculado ao sistema CLIENTE");
		} else {
			ContextHolder.authenticate(usuario, usuario.getAuthorities());
		}
	}*/
}
