import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { MyProjectLoaderComponent } from './shared/components/my-project-loader/my-project-loader.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShoesComponent } from './shoes/shoes.component';
import { ShoeDetailComponent } from './shoes/shoe-detail/shoe-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailsComponent,
    MyProjectLoaderComponent,
    ShoesComponent,
    ShoeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
