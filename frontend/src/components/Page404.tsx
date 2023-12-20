import NavBar from "./NavBar";

function Page404() {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <NavBar />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h1>Error</h1>
                </div>
            </div>
        </>
    );
}

export default Page404;
