import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Product } from './model/product.model';
 
@Injectable({
  providedIn: 'root'
})
export class ProductOrderServiceService {

  
  constructor(private htttp :HttpClient) { }



postOrder(data :Product){
  return this.htttp.post<any>("http://localhost:3000/posts",data).pipe(map((res :any)=>{return res}));
}

getOrder(){
  return this.htttp.get<any>("http://localhost:3000/posts").pipe(map((res :any)=>{return res}));
}

UpdateOrder(data :Product,id:number){
  return this.htttp.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res :any)=>{return res}));
}


deleteOrder(id:number){
  return this.htttp.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res :any)=>{return res}));
}



}