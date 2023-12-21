import axios from "axios";
import { useEffect, useState } from "react";

interface CategoryData {
    id: number;
    name: string;
}

interface MoviesData {
    id: number;
    name: string;
    category: CategoryData;
}

function MoviesTable() {
    const [moviesList, setMoviesList] = useState<MoviesData[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/movies")
            .then(({ data: movies }) => setMoviesList(movies))
            .catch((err) => console.log(err));
    }, []);

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
                        <td>Like</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MoviesTable;
