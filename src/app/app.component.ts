import { Component } from '@angular/core';
import { MovieService } from './shared/services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public movieTitle = 'Star wars';
  public movieYear = 1994;
  public rating = 9;

  constructor(private readonly movieService: MovieService) {}

  public addMovie() {
    this.movieService.addMovie({
      title: this.movieTitle,
      year: this.movieYear,
      rating: this.rating,
    });
  }
}
