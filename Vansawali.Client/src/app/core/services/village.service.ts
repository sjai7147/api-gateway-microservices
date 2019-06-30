import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Injectable()
export class VillageService {

  constructor(private httpService:HttpClient) { }

  public GetVillages(){
    var listOfVillages = this.httpService.get('http://localhost:5007/api/village')
    .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"village": "No Record Found"} as any]
                );
            }
    ));

    return listOfVillages;  
  }
}
