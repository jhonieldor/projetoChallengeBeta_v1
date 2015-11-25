package com.eits.challenge.domain.service;

import java.util.List;

import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eits.challenge.domain.entity.Produto;
import com.eits.challenge.domain.repository.IProdutoRepository;

@Service
@Transactional
@RemoteProxy(name="produtoService")
public class ProdutoService {
	
	@Autowired
	private IProdutoRepository produtoRepository;
	
	public void salvar(Produto produto){
		produtoRepository.save(produto);
	}
	
	public void remover(List<Produto> produtos){
		produtoRepository.deleteInBatch(produtos);
	}
	
	public List<Produto> listarProdutos(){
		return produtoRepository.findAll();
	}
	
	public void bloquearExclusao(Produto produto){
		produto.setProdutoVendido(true);
		produtoRepository.save(produto);
	}
	

}
