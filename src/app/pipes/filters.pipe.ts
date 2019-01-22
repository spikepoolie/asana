import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(items: any[], criteria: string): any {
    if (criteria === 'all') {
      return items;
  } else {
      return items.filter(item => {
        return item.gender === criteria;
      });
  }
  }
}
