import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

/**
 * Movie service that keeps track of a list of movies
 */
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly items: Movie[] = [];

  /**
   * Adds a movie to the array
   */
  public addMovie(movie: Movie): void {
    this.items.push(movie);
  }

  /**
   * Returns all the movies.
   */
  public getMovies(): Movie[] {
    return this.items;
  }
}
