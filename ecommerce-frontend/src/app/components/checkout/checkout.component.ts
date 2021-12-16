import { Router } from '@angular/router';
import { CheckoutService } from './../../services/checkout.service';
import { CartService } from './../../services/cart.service';
import { TheCustomValidators } from './../../validators/the-custom-validators';
import { State } from './../../common/state';
import { Country } from './../../common/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TheFormService } from './../../services/the-form.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private theFormService: TheFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.reviewCartDetails();
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:  new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        lastName:   new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        email:      new FormControl( '', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ] )
      }),
      shippingAddress: this.formBuilder.group({
        street:   new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        city:     new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        state:    new FormControl( '', [ Validators.required, ] ),
        country:  new FormControl( '', [ Validators.required, ] ),
        zipCode:  new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
      }),
      billingAddress: this.formBuilder.group({
        street:   new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        city:     new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        state:    new FormControl( '', [ Validators.required, ] ),
        country:  new FormControl( '', [ Validators.required, ] ),
        zipCode:  new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
      }),
      creditCard: this.formBuilder.group({
        cardType:         new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        nameOnCard:       new FormControl( '', [ Validators.required, Validators.minLength(2), TheCustomValidators.notOnlyWhitespace ] ),
        cardNumber:       new FormControl('', [ Validators.required, Validators.pattern('[0-9]{16}') ] ),
        securityCode:     new FormControl('', [ Validators.required, Validators.pattern('[0-9]{3}') ] ),
        expirationMonth:  [''],
        expirationYear:   ['']
      })
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);
    this.theFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years
    this.theFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    // populate countries
    this.theFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

  }


  // Getter METHODS
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName()  { return this.checkoutFormGroup.get('customer.lastName'); }
  get email()     { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates; // bug fix for states
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = []; // bug fix for states
    } 
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
    // if the current year equals the selected year, then start with the current month
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.theFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;
    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);
    this.theFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }
        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }



  onSubmit() {
    console.log("Handling the submit button");
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    // 1. Set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    // 2. Get cart items
    const cartItems = this.cartService.cartItems;
    // 3A. Create orderItems from cartItems - long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */
    // 3A. Create orderItems from cartItems - short way
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    // 4. Set up purchase
    let purchase = new Purchase();
    // 4A. Populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    // 4B. Populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;
    // 4C. Populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;
    // 4D. Populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;
    // 5. Call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
          // reset cart
          this.resetCart();
        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

  }

}
