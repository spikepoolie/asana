import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLead'
})
export class TextLeadPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
