import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allProducts:any[],searchTerm:string,propertyname:string): any[] {
    const result:any[] = [];
    if(!allProducts||searchTerm==''||propertyname==''){
      return allProducts
    }

    allProducts.forEach((item:any)=>{
      if(item[propertyname].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
