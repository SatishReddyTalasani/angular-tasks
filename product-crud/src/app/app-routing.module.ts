import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintOrderComponent } from './print-order/print-order.component';
import { ProductOrderComponent } from './product-order/product-order.component';

const routes: Routes = [
  {path:'',redirectTo:'/product-order',pathMatch:'full'},
  {path :'print/:id',component :PrintOrderComponent },
  {path :'product-order',component :ProductOrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
