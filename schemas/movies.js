import { z } from "zod/v4";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is requiered",
  }),
  year: z.number().int().min(1900).max(2030),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(null).nullable(),
  poster: z.url(),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Comedy",
      "Drama",
      "Horror",
      "Sci-Fi",
    ])
  ),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
