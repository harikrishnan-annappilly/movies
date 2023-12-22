import { MoviesData } from "../../hooks/userMovie";
import Like from "../utils/Like";
import TableButton from "../utils/TableButton";

interface Props {
    movies: MoviesData[];
    onLike: (movieID: number) => void;
    onEdit: (movieID: number) => void;
    onDelete: (movieID: number) => void;
}

function MoviesTable(props: Props) {
    const { movies, onLike, onEdit, onDelete } = props;

    return (
        <table className="table table-hover table-striped m-0">
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
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.name}</td>
                        <td>{movie.category.name}</td>
                        <td>
                            <Like
                                liked={movie.liked}
                                onClick={() => onLike(movie.id)}
                            />
                        </td>
                        <td>
                            <TableButton
                                type="edit"
                                color="warning"
                                onClick={() => onEdit(movie.id)}
                            />
                        </td>
                        <td>
                            <TableButton
                                color="danger"
                                type="delete"
                                onClick={() => onDelete(movie.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MoviesTable;
