package com.eits.challenge.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;


public class AbstractCRUDService<T> {

	
	private JpaRepository<T, Long> abstractRepository;
	
	private Class<T> entityClass;
	
	public AbstractCRUDService(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	public void save(T entity){
		Assert.notNull(entity);
		abstractRepository.save(entity);
	}

	public void remove(T entity){
		Assert.notNull(entity);
		abstractRepository.delete(entity);
	}
	
	public List<T> findAll(){
		return  abstractRepository.findAll();
	}
	
	public T findById(Long id){
		return abstractRepository.findOne(id);
	}
	

	public Class<T> getEntityClass() {
		return entityClass;
	}

	public void setEntityClass(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	
	
}
