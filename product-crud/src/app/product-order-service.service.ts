import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderServiceService {


  constructor(private htttp: HttpClient) { }



  postOrder(data: Product) {
    return this.htttp.post<any>("http://localhost:3000/posts", data);
  }

  getOrder() {
    return this.htttp.get<any>("http://localhost:3000/posts");
  }

  getOrderById(id:any) {
    return this.htttp.get<any>("http://localhost:3000/posts/"+id);
  }

  UpdateOrder(data: Product, id: number) {
    return this.htttp.put<any>("http://localhost:3000/posts/" + id, data);
  }


  deleteOrder(id: number) {
    return this.htttp.delete<any>("http://localhost:3000/posts/" + id);
  }



}