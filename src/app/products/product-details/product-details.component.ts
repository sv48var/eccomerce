import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CsvreaderService } from '../../shared/service/csvreader.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  gender!: string; 
  sku!: string; 
  shoes: any;
  loading: boolean = true;
  slickConfig: any;
  csvurl:string = './assets/data.csv';
  productDetails:any;
  images:any[] = [];

  
  constructor(
    private route: ActivatedRoute, 
    private csvreader: CsvreaderService
  ) {
    this.slickConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gender = params.get('gender') || ''; 
      this.sku = params.get('sku') || ''; 
      // this.fetchProductDetails();
      this.getProductDetails(this.sku);
    });
  }

  getProductDetails(sku:any){
    this.csvreader.getProducts(this.csvurl).subscribe(result=>{
      console.log(result);
      this.productDetails = (result.filter(product=>product.sku === sku))[0];
      console.log(this.productDetails)
      this.loading = false;
    })
  }
}
