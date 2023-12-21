import CategoryList from "./CategoryList";
import MoviesTable from "./MoviesTable";

function MoviesApp() {
    return (
        <div className="row mb-3">
            <div className="d-none d-lg-block col-12 col-lg-3 bg-primary pe-0">
                <div className="mx-2">
                    <CategoryList />
                </div>
            </div>
            <div className="col-12 col-lg-9 bg-success ps-0">
                <div className="mx-2">
                    <MoviesTable />
                </div>
            </div>
        </div>
    );
}

export default MoviesApp;
