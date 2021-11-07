import { Injectable } from '@angular/core';
import {IMovieData} from '../models/movie.interface'
@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  constructor() {}
  private data:object[] = [];
setData(data:object){
  this.data.push(data);
}
getData(){
  let temp = this.data;
  this.clearData();
  return temp;
}
clearData(){
  this.data = [];
}
}
