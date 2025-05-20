import { MovieModel } from "../models/local/movie.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre, year } = req.query;
    const movies = await MovieModel.getAll({ genre, year });

    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });

    res.json(movie);
  }

  static async create(req, res) {
    const result = validateMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    const newMovie = await MovieModel.create({ input: result.data });

    res.json({ message: "Movie created", movie: newMovie });
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);

    if (result.error) {
      return json.status(400).json({ error: result.error.message });
    }

    const updatedMovie = await MovieModel.update({ id, input: result.data });

    if (updatedMovie === false) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json(updatedMovie);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const deletedMovie = await MovieModel.delete({ id });

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted", movie: deletedMovie });
  }
}
