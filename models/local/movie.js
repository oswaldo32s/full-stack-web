import movies from '../../movies.json' with {type: 'json'}
import { randomUUID } from "crypto";

export class MovieModel {
  static async getAll ({genre, year}) {
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some(
          (movieGenre) =>
            movieGenre.toLocaleLowerCase() === genre.toLocaleLowerCase()
        )
      );

      return filteredMovies;
    } else if (year) {
      const filteredMovies = movies.filter(
        (movie) => Number(movie.year) === Number(year)
      );

      return filteredMovies;
    }
    return movies
  }

  static async getById ({id}) {
    const movie = movies.find((movie) => movie.id == id);

    if (movie) return movie;
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };

    movies.push(newMovie)

    return newMovie
  }

  static async update ({id, input}) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) {
      return false;
    }
  
    const updatedMovie = {
      ...movies[movieIndex],
      ...input,
    };
  
    movies[movieIndex] = updatedMovie;

    return updatedMovie
  }

  static async delete ({id}) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      return false;
    }
  
    const deletedMovie = movies[movieIndex];
    movies.splice(movieIndex, 1);

    return deletedMovie
  }
}