import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStockBajoPipe',
  standalone: true, 
})
export class FilterStockBajoPipePipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.filter(i => i.stock_actual <= i.stock_minimo);
  }


}
