import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductOrderServiceService } from '../product-order-service.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  orderDetails !: FormGroup;
  orderData !: any;
  productObj: Product = new Product();
  Total!:number;
  defaultQuantity:number=1;
  defaultCGST:number=5;
  defaultSGST:number=5;
  options :String[]=["Redmi","Realme","Samsung","Nokia","Vivo","Oppo"];

  constructor(private _router:Router,private formBuilder: FormBuilder, private service: ProductOrderServiceService) { }

  ngOnInit(): void {

    
    this.orderDetails = this.formBuilder.group({
      Invoice_Number: [''],
      Invoice_Date: ['', Validators.required],
      Received_Name: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]+")]],
      Address: ['', Validators.required],
      S_No: ['' ],
      Item: ['', Validators.required],
      Quantity: ['', Validators.required],
      Price: ['', Validators.required],
      Total: [''],
      CGST: [''],
      SGST: [''],
      Total_Tax: [''],
      Net_Total: ['']



    });
    
    this.getAllOrders();
  }

  onSelect(x : any){
     this._router.navigate(['/print',x.id]);
  }
getTotal(){
  this.orderDetails.controls["Total"].setValue(this.orderDetails.value.Quantity * this.orderDetails.value.Price);
}
  addOrder() {
    this.productObj.id = this.orderDetails.value.id;
    this.productObj.Invoice_Number = Math.floor((Math.random() * 100000) + 1);
    this.productObj.Invoice_Date = this.orderDetails.value.Invoice_Date;
    this.productObj.Received_Name = this.orderDetails.value.Received_Name;
    this.productObj.Address = this.orderDetails.value.Address;
    this.productObj.S_No = this.orderDetails.value.S_No;
    this.productObj.Item = this.orderDetails.value.Item;
    this.productObj.Quantity = this.orderDetails.value.Quantity;
    this.productObj.Price = this.orderDetails.value.Price;
    this.productObj.Total = this.productObj.Price*this.productObj.Quantity;
    this.productObj.CGST = this.orderDetails.value.CGST;
    this.productObj.SGST = this.orderDetails.value.SGST;
    this.productObj.Total_Tax = ((this.productObj.CGST + this.productObj.SGST) * this.productObj.Total) / 100;
    this.productObj.Net_Total = this.productObj.Total_Tax + this.productObj.Total;

    this.service.postOrder(this.productObj).subscribe((res) => {
      console.log(res);
      alert("order added succesfully")
      let ref = document.getElementById("cancel");
      ref?.click();
      this.orderDetails.reset();
      this.getAllOrders();
    },
      err => {
        alert("something went wrong");

      });
  }

  getAllOrders() {
    this.service.getOrder().subscribe((res) => { this.orderData = res; })
  }

  deleteOrder(data: Product) {
    confirm("do you want to delete this order "+data.Invoice_Number+" ?")
    this.service.deleteOrder(data.id).subscribe((res) => {
      alert("record deleted successfully!");
      this.getAllOrders();
    });

  }

  onEdit(data: Product) {
    this.productObj.id = data.id;
    this.orderDetails.controls["Invoice_Number"].setValue(data.Invoice_Number);
    this.orderDetails.controls["Invoice_Date"].setValue(data.Invoice_Date);
    this.orderDetails.controls["Received_Name"].setValue(data.Received_Name);
    this.orderDetails.controls["Address"].setValue(data.Address);
    this.orderDetails.controls["S_No"].setValue(data.S_No);
    this.orderDetails.controls["Item"].setValue(data.Item);
    this.orderDetails.controls["Quantity"].setValue(data.Quantity);
    this.orderDetails.controls["Price"].setValue(data.Price);
    this.orderDetails.controls["Total"].setValue(data.Total);
    this.orderDetails.controls["CGST"].setValue(data.CGST);
    this.orderDetails.controls["SGST"].setValue(data.SGST);
    this.orderDetails.controls["Total_Tax"].setValue(data.Total_Tax);
    this.orderDetails.controls["Net_Total"].setValue(data.Net_Total);
  }

  updateOrder() {

    this.productObj.Invoice_Number = this.orderDetails.value.Invoice_Number;
    this.productObj.Invoice_Date = this.orderDetails.value.Invoice_Date;
    this.productObj.Received_Name = this.orderDetails.value.Received_Name;
    this.productObj.Address = this.orderDetails.value.Address;
    this.productObj.S_No = this.orderDetails.value.S_No;
    this.productObj.Item = this.orderDetails.value.Item;
    this.productObj.Quantity = this.orderDetails.value.Quantity;
    this.productObj.Price = this.orderDetails.value.Price;
    this.productObj.Total = this.productObj.Quantity * this.productObj.Price;
    this.productObj.CGST = this.orderDetails.value.CGST;
    this.productObj.SGST = this.orderDetails.value.SGST;
    this.productObj.Total_Tax = ((this.productObj.CGST + this.productObj.SGST) * this.productObj.Total) / 100;
    this.productObj.Net_Total = this.productObj.Total_Tax + this.productObj.Total;

    this.service.UpdateOrder(this.productObj, this.productObj.id).subscribe((res) => {
      alert("record updated successfully!");
      this.orderDetails.reset();
      this.getAllOrders();
    },
      err => {
        alert("something went wrong");

      });
  }




}
