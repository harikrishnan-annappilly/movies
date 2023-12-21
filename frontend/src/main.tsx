import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import Page404 from "./components/Page404.tsx";
import MoviesApp from "./components/movies/MoviesApp.tsx";

const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Page404 />,
        children: [
            { index: true, element: <MoviesApp /> },
            { path: "/movies", element: <MoviesApp /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={myRouter} />
    </React.StrictMode>
);
