import http from "./api-service";
import { z } from "zod";

export const movieSchema = z.object({
    name: z.string().min(3),
    price: z.number({ invalid_type_error: "Invalid number" }).min(1),
    categoryID: z.number({ invalid_type_error: "Invalid selection" }).min(1),
});

export type MovieFormData = z.infer<typeof movieSchema>;

export const saveMovie = (
    movie: MovieFormData & { movieID: string | undefined }
) => {
    const data = {
        name: movie.name,
        category_id: movie.categoryID,
    };
    if (movie.movieID === "new" || movie.movieID === undefined)
        return http.post("/movies", data);
    return http.put("/movie/" + movie.movieID, data);
};

export const deleteMovie = (movieID: number) => {
    return http.delete("/movie/" + movieID);
};
