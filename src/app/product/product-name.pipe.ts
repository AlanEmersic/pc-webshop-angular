import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'productName',
})
export class ProductNamePipe implements PipeTransform {
  transform(products: Product[], text: string): Product[] {
    if (!products || !text) {
      return products;
    }

    return products.filter((product) => {
      return product.name.toLowerCase().includes(text.toLowerCase());
    });
  }
}
