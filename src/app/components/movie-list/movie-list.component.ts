import { Component,AfterViewInit, Input, OnInit ,ViewChild,Pipe} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  public  dataMovie:any

  constructor( private MovieData:MovieDataService) {
    this.dataMovie = this.MovieData.getData()
    if(this.dataMovie){
      console.log("data in movie-list: ",this.dataMovie)
    }
  }
}
