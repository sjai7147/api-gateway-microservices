import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { PersonDetail } from '../models/personDetail';

@Injectable()
export class PersonService {

    httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'
   }); 
    options = {
    headers: this.httpHeaders
    }; 
  constructor (private httpService: HttpClient) { }  
 
  search(term,villageId?) {
      let url=`http://localhost:5005/api/persons/SearchPersonByName/${term}/${villageId}`
      //var listOfPerson = this.httpService.get('http://localhost:5005/api/persons/SearchPersonByName/' + term)
      var listOfPerson = this.httpService.get(url)
      .pipe(
          debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
          map(
              (data: any) => {
                  return (
                      data.length != 0 ? data as any[] : [{"Person": "No Record Found"} as any]
                  );
              }
      ));

      return listOfPerson;  
  } 

  //In future i will seprate below functionality in other file
  getPersonHierarchy(id:Number){
    var listOfPersonHierarchy = this.httpService.get('http://localhost:5005/api/persons/GetPersonHierarchy/' + id)
    .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"Person": "No Record Found"} as any]
                );
            }
    ));

    return listOfPersonHierarchy;  
  }
  savePerson(persons:PersonDetail){
    let url='http://localhost:5005/api/persons';
   return this.httpService.post(url,persons,this.options).pipe(map((data)=>{return data;}));
  }
}
