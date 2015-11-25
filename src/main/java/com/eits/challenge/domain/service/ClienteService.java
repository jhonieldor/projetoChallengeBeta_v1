package com.eits.challenge.domain.service;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eits.challenge.domain.entity.Cliente;
import com.eits.challenge.domain.repository.IClienteRepository;



@Service
@Transactional
@RemoteProxy(name = "clienteService")
public class ClienteService{

	
	@Autowired
	IClienteRepository clienteRepository;

	
	public ClienteService() {
		System.out.println("Teste do service: ClienteService");
	}


	public void salvar(Cliente cliente){
		clienteRepository.save(cliente);
	}

	public List<Cliente> listarClientes(){
		return clienteRepository.findAll();
	}
	
	
	public void remover(List<Cliente> clientes){
		//Assert.assertNotNull(cliente);
		clienteRepository.delete(clientes);
	}
	
	public void bloquearExclusao(Cliente cliente){
		cliente.setExclusaoBloqueada(true);
	}
}
