import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

function App() {
    return (
        <>
            <div className="row">
                <div className="col">
                    <NavBar />
                </div>
            </div>
            <Outlet />
            <div className="row">
                <div className="col text-white">Footer</div>
            </div>
        </>
    );
}

export default App;
