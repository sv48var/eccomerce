// shoe.model.ts
export interface Shoe {
    url: string;
    title: string;
    asin: string;
    price: string;
    brand: string;
    product_details: string;
    breadcrumbs: string;
    images_list: string[];
    features: Array<{ [key: string]: string }>;
  }
  