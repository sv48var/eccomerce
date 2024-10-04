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
  csvurl:string = './assets/data.csv';
  products: any[] = []; 
  filteredProducts: any[] = [];
  showFilterMenu = false;


  constructor(
    private csvreader:CsvreaderService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  filterProducts(gender: string) {
    if (gender === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.gender === gender);
    }
  }

  getProducts():any{
    this.csvreader.getProducts(this.csvurl).subscribe((result:any)=>{
      this.products = result;
      this.filteredProducts = this.products; 
      this.loading = false;
    })
  }

  addToCart(product:any){

  }
}
