import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class XmlHttpService {

private  httpHeaders:HttpHeaders; 
private options:Object; 
private baseUrl=environment.url.baseUrl;
  constructor(private http:HttpClient) {
      this.httpHeaders = new HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache'
      }); 

      this.options= {
        headers: this.httpHeaders
        }; 
   }

   private getFullUrl(url):string{
      return this.baseUrl+'/'+url;
   }
   get<T>(url:string):Observable<T>{
    let nurl=this.getFullUrl(url);
    return this.http.get(nurl,this.options).pipe(map((data)=>{ return data as T;}))
   };
   post<T>(url:string,data:any):Observable<T>{
    let nurl=this.getFullUrl(url);
    return this.http.post(nurl,data,this.options).pipe(map((data)=>{ return data as T;}));

   }
   put<T>(url:string,data:any):Observable<T>{
    let nurl=this.getFullUrl(url);
    return this.http.put(url,data,this.options).pipe(map((data)=>{ return data as T;}));

   }
   delete<T>(url:string,data:any):Observable<T>{
    let nurl=this.getFullUrl(url);
    return this.http.delete(url,this.options).pipe(map((data)=>{ return data as T;}));
   }

}
