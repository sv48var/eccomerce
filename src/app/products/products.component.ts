import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CsvreaderService } from '../shared/service/csvreader.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  gender: string | null = null;
  shoes: any[] = [];
  loading = true;
  sortOrder = 'desc';
  products:any[] = [];
  csvurl:string = './assets/data.csv'

  constructor(
    private route: ActivatedRoute,
    private csvreader:CsvreaderService,
  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
      // this.gender = params.get('gender');
      // this.fetchShoes();
      this.getProducts(this.gender);
    // });
  }

  getProducts(gender:any){
    this.csvreader.getProducts(this.csvurl).subscribe((result:any)=>{
      console.log(result);
      this.products = result;
      // this.products = result.filter((product:any) => product.gender == gender)
      console.log(this.products)
      this.loading = false;
    })
  }

}
