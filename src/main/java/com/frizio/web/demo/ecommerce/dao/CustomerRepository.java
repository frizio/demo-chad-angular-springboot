package com.frizio.web.demo.ecommerce.dao;

import com.frizio.web.demo.ecommerce.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  
}
