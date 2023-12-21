import axios from "axios";
import { useEffect, useState } from "react";
import Like from "../utils/Like";

interface CategoryData {
    id: number;
    name: string;
}

interface MoviesData {
    id: number;
    name: string;
    category: CategoryData;
    liked: boolean;
}

function MoviesTable() {
    const [moviesList, setMoviesList] = useState<MoviesData[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/movies")
            .then(({ data: movies }) => setMoviesList(movies))
            .catch((err) => console.log(err));
    }, []);

    const handleLike = (movieId: number) => {
        const newMovieList = moviesList.map((movie) =>
            movie.id === movieId ? { ...movie, liked: !movie.liked } : movie
        );
        setMoviesList(newMovieList);
    };

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Like</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {moviesList.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.name}</td>
                        <td>{movie.category.name}</td>
                        <td>
                            <Like
                                liked={movie.liked}
                                onClick={() => handleLike(movie.id)}
                            />
                        </td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MoviesTable;
