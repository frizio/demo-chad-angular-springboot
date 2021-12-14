import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

      ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
          this.handleProductDetails();
        })
      }
    
      handleProductDetails() {
        const theProductId: number = +this.route.snapshot.paramMap.get('id');
        this.productService.getProduct(theProductId).subscribe(
          data => {
            this.product = data;
          }
        )
      }

}