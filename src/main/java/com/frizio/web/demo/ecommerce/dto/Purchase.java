package com.frizio.web.demo.ecommerce.dto;

import java.util.Set;

import com.frizio.web.demo.ecommerce.entity.Address;
import com.frizio.web.demo.ecommerce.entity.Customer;
import com.frizio.web.demo.ecommerce.entity.Order;
import com.frizio.web.demo.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}