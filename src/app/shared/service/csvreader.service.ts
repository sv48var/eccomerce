import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';
import { Product } from '../models/product.model';
import { Shoe } from '../models/shoe.model';

@Injectable({
  providedIn: 'root'
})
export class CsvreaderService {
  constructor(private http: HttpClient) {}

  public getProducts(csvUrl: string): Observable<Product[]> {
    return this.http.get(csvUrl, { responseType: 'text' }).pipe(
      map(csvData => {
        const products: Product[] = [];
        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            result.data.forEach((row: any) => {
              products.push({
                name: row.name,
                sku: row.sku,
                mpn: row.mpn,
                price: parseFloat(row.price),
                in_stock: row.in_stock ? row.in_stock.toLowerCase() === 'true' : false,
                currency: row.currency,
                brand: row.brand,
                description: row.description,
                images: row.images ? row.images.split(' ~ ') : [],
                gender: row.gender
              });
            });
          }
        });
        return products;
      })
    );
  }

  public getShoes(csvUrl:string): Observable<Shoe[]> {
    return this.http.get(csvUrl, { responseType: 'text' }).pipe(
      map(data => {
        const parsedData = Papa.parse(data, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        }).data as Shoe[];
        
        parsedData.forEach((shoe:any) => {
          shoe.images_list = JSON.parse(shoe.images_list);
          // shoe.features = JSON.parse(shoe.features);
        });

        return parsedData;
      })
    );
  }
}

