import axios from "axios";
import { useEffect, useState } from "react";
import Like from "../utils/Like";
import TableButton from "../utils/TableButton";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    useEffect(() => {
        const constoller = {
            movies: new AbortController(),
        };

        axios
            .get("http://localhost:5000/movies", {
                signal: constoller.movies.signal,
            })
            .then(({ data: movies }) => setMoviesList(movies))
            .catch((err) => console.log(err));

        return () => {
            constoller.movies.abort();
        };
    }, []);

    const handleLike = (movieId: number) => {
        const newMovieList = moviesList.map((movie) =>
            movie.id === movieId ? { ...movie, liked: !movie.liked } : movie
        );
        setMoviesList(newMovieList);
    };

    const handleEdit = (movieId: number) => {
        console.log("Edit clicked for movie", movieId);
        navigate("/edit/" + movieId);
    };

    const handleDelete = (movieId: number) => {
        const newMovieList = moviesList.filter((movie) => movie.id !== movieId);
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
                        <td>
                            <TableButton
                                type="edit"
                                color="warning"
                                onClick={() => handleEdit(movie.id)}
                            />
                        </td>
                        <td>
                            <TableButton
                                color="danger"
                                type="delete"
                                onClick={() => handleDelete(movie.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MoviesTable;
