import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ShoesComponent } from './shoes/shoes.component';
import { ShoeDetailComponent } from './shoes/shoe-detail/shoe-detail.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  { path: 'products/:sku', component: ProductDetailsComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'shoes', component:ShoesComponent },
  { path: 'shoes/:sku', component:ShoeDetailComponent },
  { path: 'upload', component:UploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
