import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
// transform function will convert the input into a new formate/data
// first argument - data will be transformed
// second argumnet - based on which this will be done

  transform(allEmployees:any[],searchKey:string): any[] {
    
    const result:any=[]

    if (!allEmployees || searchKey=="") {
      return allEmployees
    }
    allEmployees.forEach((item:any)=>{
      if(item.username.trim().toLowerCase().includes(searchKey.trim().toLocaleLowerCase())){
        result.push(item)
      }
    })
    return result
    
    
  }

}
