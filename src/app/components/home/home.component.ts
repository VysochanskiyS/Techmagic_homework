import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieDataService } from 'src/app/services/movie-data.service';
import {Renderer2} from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${environment.API_KEY}`
    })
}
public movieSearch:any
public movie: any;
@ViewChild('value') value:any;

  addFlim(event:Event,movie_selected:any){
    this.render.addClass(event.target,"addMovie")
    this.MovieDataService.setData(movie_selected)
    console.log(movie_selected)
  }
  constructor(private movieService: MovieService,private http:HttpClient, private render:Renderer2,private MovieDataService:MovieDataService) { }
  ngOnInit(): void {
    this.movieService.getMovie()
      .subscribe((movie: any) => {
        console.log(movie.results)
       this.movie = movie.results
    },(err)=>{console.log(err)});
  }

  public search():Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/search/movie?api_key=${environment.API_KEY}&query=${this.value.nativeElement.value}`, this.httpOptions)
}
  searchMovie(event:any){
   this.search().subscribe((el)=>{
      this.movieSearch = el.results
    })
  }
}
  // add_movie = () =>{
  //   this.add = true;
  //  };
