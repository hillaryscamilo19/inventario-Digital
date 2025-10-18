import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStockBajo',
    standalone: true, 
})
export class FilterStockBajoPipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.filter(i => i.stock_actual >- i.stock_minimo);
  }


}
