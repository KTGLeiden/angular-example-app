import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-hisham-test',
  templateUrl: './hisham-test.component.html',
  styleUrls: ['./hisham-test.component.css'],
})
export class HishamTestComponent implements OnInit {
  public hishamCars = ['Tesla', 'BMW', 'Mercedes', 'Renault', 'Porsche'];
  public dateExample = new Date();
  public currencyExample = 35085.82;

  public movies: Movie[];

  constructor(movieService: MovieService) {
    this.movies = movieService.getMovies();
  }

  ngOnInit(): void {}

  public updateTime() {
    this.dateExample = new Date();
  }
}
