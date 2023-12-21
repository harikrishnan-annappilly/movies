import MoviesTable from "./MoviesTable";

function MoviesApp() {
    return (
        <div className="row">
            <div className="d-none d-lg-block col-12 col-lg-3 bg-primary">
                Category
            </div>
            <div className="col-12 col-lg-9 bg-success">
                <MoviesTable />
            </div>
        </div>
    );
}

export default MoviesApp;
