import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovie } from '../models/movie.interface';
import { Observable,of } from 'rxjs';

@Injectable()
export class MovieService {
  public httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${environment.API_KEY}`
        })
    }
   
    constructor( private httpClient:HttpClient ) {}
    public getMovie(): Observable<IMovie> {
        return this.httpClient.get<IMovie>(`${environment.BASE_URL}/trending/all/day`, this.httpOptions)
    }
    // private data:any;
    // setData(data:any){
    //   this.data = data;
    // }
    // getData(){
    //   let temp = this.data;
    //   this.clearData();
    //   return temp;
    // }
    // clearData(){
    //   this.data = undefined;
    // }
   
}