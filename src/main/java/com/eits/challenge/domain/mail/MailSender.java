package com.eits.challenge.domain.mail;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;

public class MailSender implements Runnable{

	private String emailAddress;
	private String message;
	private String subject;

	private void notificar() {
		try {
			SimpleEmail email = new SimpleEmail();

			try {
				email.setHostName("smtp.googlemail.com");
				email.setSmtpPort(465);
				email.setAuthenticator(new DefaultAuthenticator("jhonieits@gmail.com", "admin12345678"));
				email.setSSLOnConnect(true);
				email.setFrom("jhonieits@gmail.com");
				email.setSubject(subject);
				email.setMsg(message);
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

	public MailSender(String emailAddress, String message, String subject) {
		this.emailAddress = emailAddress;
		this.message = message;
		this.subject = subject;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	@Override
	public void run() {
		// TODO Auto-generated method stub
		this.notificar();
	}

}
