package com.frizio.web.demo.ecommerce.dao.service;

import javax.transaction.Transactional;

import com.frizio.web.demo.ecommerce.dao.CustomerRepository;
import com.frizio.web.demo.ecommerce.dto.Purchase;
import com.frizio.web.demo.ecommerce.dto.PurchaseResponse;

import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        return null;
    }
    
}
