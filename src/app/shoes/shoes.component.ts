import { Component, OnInit } from '@angular/core';
import { CsvreaderService } from '../shared/service/csvreader.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.scss'
})
export class ShoesComponent implements OnInit{

  shoes:any[] = [];
  loading:boolean = false;
  csvurl:string = './assets/amazon_uk_shoes_dataset.csv'

  ngOnInit(): void {
    this.getShoes()
  }
  constructor(
    private csvreader: CsvreaderService
  ){}
  getShoes(){
    this.csvreader.getShoes(this.csvurl).subscribe((result:any)=>{
      console.log(result);
      this.shoes = result.slice(0.100);
      console.log(result[0]);
      // this.products = result.filter((product:any) => product.gender == gender)
      console.log(this.shoes)
      this.loading = false;
    })
  }
}
