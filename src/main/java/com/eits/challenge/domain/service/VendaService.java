package com.eits.challenge.domain.service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eits.challenge.domain.entity.Cliente;
import com.eits.challenge.domain.entity.Produto;
import com.eits.challenge.domain.entity.ProdutoVenda;
import com.eits.challenge.domain.entity.Usuario;
import com.eits.challenge.domain.entity.Venda;
import com.eits.challenge.domain.repository.IClienteRepository;
import com.eits.challenge.domain.repository.IProdutoRepository;
import com.eits.challenge.domain.repository.IProdutoVendaService;
import com.eits.challenge.domain.repository.IVendaRepository;

@Service
@Transactional
@RemoteProxy(name="vendaService")
public class VendaService {

	@Autowired
	private IProdutoRepository produtoRepository;
	
	@Autowired
	private IVendaRepository vendaRepository;
	
	@Autowired
	private IProdutoVendaService produtoVendaRepository;
	
	@Autowired
	private IClienteRepository clienteRepository;

	private BigDecimal totalVendas;
	
	
	public void addProduto(ProdutoVenda produtoVenda, List<ProdutoVenda> produtos, Produto produto, Venda venda){
		produtoVenda.setVenda(venda);
		produtoVenda.setProduto(produto);
		
		produtoVendaRepository.save(produtoVenda);
		atualizarProduto(produto, produtoVenda);
	}

	public void atualizarProduto(Produto produto, ProdutoVenda produtoVenda){
		Integer saldoAtual = produto.getSaldoEstoque();
		produto.setSaldoEstoque(saldoAtual - produtoVenda.getQuantidade());
		produto.setProdutoVendido(true);
		produtoRepository.save(produto);
	}
	
	public void lancarVenda(Venda venda, Usuario usuario, Cliente cliente){
		venda.setCliente(cliente);
		venda.setUsuario(usuario);
		venda.setDataVenda(Calendar.getInstance());
		salvarVenda(venda);
	}
	
	public Double calcularTotalVenda(List<ProdutoVenda> produtos){
		
		Double totalVenda = 0.0;
		
		for(ProdutoVenda produto: produtos){
			totalVenda = totalVenda + produto.getValor().doubleValue();
		}
		
		return totalVenda;
	}
	
	
        public  List<Cliente> buscarClientes(){
            return clienteRepository.findAll();
        }
        
        public List<Produto> buscarProdutos(){
            return produtoRepository.findAll();
        }
        
	public void salvarVenda(Venda venda){
		vendaRepository.save(venda);
	}
	
	public List<Venda> listarVendas(){
		return vendaRepository.findAll();
	}
	
	public void estornarVenda(Venda venda){
		venda.setEstornada(true);
	}
	

	public BigDecimal getTotalVendas() {
		return totalVendas;
	}


	public void setTotalVendas(BigDecimal totalVendas) {
		this.totalVendas = totalVendas;
	}

	
	
	
	//public void lancarVenda()
	
}
