import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';


@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    if(filterText.length > 1){
      filterText = filterText?filterText.toLocaleLowerCase():""
      return filterText?value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1 
      ||c.description.toLocaleLowerCase().indexOf(filterText)!==-1):value; //-1 bir kural, öyle yazcan hep
    }

    return value;
  }

}
