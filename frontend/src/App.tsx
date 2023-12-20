function App() {
    return (
        <>
            <div className="row">
                <div className="col-12 bg-danger">NavBar</div>
            </div>
            <div className="row">
                <div className="d-none d-md-block col-12 col-md-4 col-lg-3 bg-primary">
                    Category
                </div>
                <div className="col-12 col-md-8 col-lg-9 bg-success">
                    Movies
                </div>
            </div>
        </>
    );
}

export default App;
