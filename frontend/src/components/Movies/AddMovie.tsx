import { useNavigate } from "react-router-dom";

function AddMovie() {
    const navigate = useNavigate();
    return (
        <button
            className="btn btn-primary"
            onClick={() => navigate("/movie/new")}
        >
            Add Movie
        </button>
    );
}

export default AddMovie;
