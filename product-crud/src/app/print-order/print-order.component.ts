import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductOrderServiceService } from '../product-order-service.service';
import { ProductOrderComponent } from '../product-order/product-order.component';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css']
})
export class PrintOrderComponent implements OnInit {

  product!:Product;
  constructor(private activate:ActivatedRoute,private service:ProductOrderServiceService) { }

  ngOnInit(): void {
   let orderId=this.activate.snapshot.paramMap.get("id");
    this.service.getOrderById(orderId).subscribe(data=>{
      this.product=data;
    })
  }

}
