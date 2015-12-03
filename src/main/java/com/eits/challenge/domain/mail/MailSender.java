package com.eits.challenge.domain.mail;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;

public class MailSender implements Runnable{
	
	private String emailAddress;
	
	private void notificarUsuario() {
		try {
			SimpleEmail email = new SimpleEmail();

			try {
				email.setHostName("smtp.googlemail.com");
				email.setSmtpPort(465);
				email.setAuthenticator(new DefaultAuthenticator("postmastereits@gmail.com", "12441212"));
				email.setSSLOnConnect(true);
				email.setFrom("postmastereits@gmail.com");
				email.setSubject("Sistema de Cadastro de Projetos");
				email.setMsg("Teste Email Desafio Cadastro Projetos");
				email.addTo(emailAddress);
				email.send();
			} catch (EmailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	public MailSender(String email) {
		this.emailAddress = email;
	}

	public String getEmailAddress() {
		return emailAddress;
	}




	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}




	@Override
	public void run() {
		// TODO Auto-generated method stub
		
	}

}
