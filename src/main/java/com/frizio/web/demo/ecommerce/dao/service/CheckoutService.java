package com.frizio.web.demo.ecommerce.dao.service;

import com.frizio.web.demo.ecommerce.dto.Purchase;
import com.frizio.web.demo.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
  
  PurchaseResponse placeOrder(Purchase purchase);

}
