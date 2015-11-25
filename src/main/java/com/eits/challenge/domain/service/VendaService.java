package com.eits.challenge.domain.service;

import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eits.challenge.domain.entity.Produto;
import com.eits.challenge.domain.entity.ProdutoVenda;
import com.eits.challenge.domain.repository.IClienteRepository;
import com.eits.challenge.domain.repository.IProdutoRepository;
import com.eits.challenge.domain.repository.IProdutoVendaService;
import com.eits.challenge.domain.repository.IVendaRepository;

@Service
@Transactional
public class VendaService {

	@Autowired
	private IProdutoRepository produtoRepository;
	
	@Autowired
	private IVendaRepository vendaRepository;
	
	@Autowired
	private IProdutoVendaService produtoVendaRepository;
	
	@Autowired
	private IClienteRepository clienteRepository;

	
	public void addProduto(ProdutoVenda produto){
		
	}
	
	
	
	public IProdutoRepository getProdutoRepository() {
		return produtoRepository;
	}

	public void setProdutoRepository(IProdutoRepository produtoRepository) {
		this.produtoRepository = produtoRepository;
	}

	public IVendaRepository getVendaRepository() {
		return vendaRepository;
	}

	public void setVendaRepository(IVendaRepository vendaRepository) {
		this.vendaRepository = vendaRepository;
	}

	public IProdutoVendaService getProdutoVendaRepository() {
		return produtoVendaRepository;
	}

	public void setProdutoVendaRepository(IProdutoVendaService produtoVendaRepository) {
		this.produtoVendaRepository = produtoVendaRepository;
	}

	public IClienteRepository getClienteRepository() {
		return clienteRepository;
	}

	public void setClienteRepository(IClienteRepository clienteRepository) {
		this.clienteRepository = clienteRepository;
	}
	
	
	
	
	
	
}
