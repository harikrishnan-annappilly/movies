import { useNavigate } from "react-router-dom";

import CategoryList from "./CategoryList";
import MoviesTable from "./MoviesTable";
import userMovie, { MoviesData } from "../../hooks/userMovie";
import useCategory, { CategoryData } from "../../hooks/useCategory";
import { useState } from "react";
import Pagination from "../utils/Pagination";
import { ceil } from "lodash";

function MoviesApp() {
    const { categoryList, defaultCategory } = useCategory();
    const { moviesList, setMoviesList } = userMovie();
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryData>(defaultCategory);
    const navigate = useNavigate();

    const [pageNav, setPageNav] = useState({
        itemsPerPage: 4,
        currentPage: 1,
    });

    const handleCategoryChange = (category: CategoryData) => {
        setSelectedCategory(category);
        resetPage();
    };

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

    const setPage = (page: number) => {
        setPageNav({ ...pageNav, currentPage: page });
    };

    const resetPage = () => {
        setPage(1);
    };

    const getFilteredMovies = (movies: MoviesData[]) => {
        if (selectedCategory.id < 1) return movies;
        const newMovies = movies.filter(
            (m) => m.category.id === selectedCategory.id
        );
        return newMovies;
    };

    const getMoviesToRender = (movies: MoviesData[]) => {
        const startIndex =
            Math.max(pageNav.currentPage - 1, 0) * pageNav.itemsPerPage;
        const endIndex = startIndex + pageNav.itemsPerPage;
        return movies.slice(startIndex, endIndex);
    };

    const filterdMovies = getFilteredMovies(moviesList);
    const moviesToRender = getMoviesToRender(filterdMovies);

    if (moviesToRender.length === 0 && moviesList.length !== 0)
        setPage(pageNav.currentPage - 1);

    return (
        <div className="row mb-3">
            <div className="d-none d-lg-block col-12 col-lg-3 bg-primary pe-0">
                <div className="mx-2">
                    <CategoryList
                        categoryList={categoryList}
                        selectedCategory={selectedCategory}
                        onClick={handleCategoryChange}
                    />
                </div>
            </div>
            <div className="col-12 col-lg-9 bg-success ps-0">
                <div className="mx-2 mb-3">
                    <MoviesTable
                        movies={moviesToRender}
                        onLike={handleLike}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
                <div className="mx-2 mb-3">
                    <Pagination
                        count={ceil(
                            filterdMovies.length / pageNav.itemsPerPage
                        )}
                        select={pageNav.currentPage}
                        onClick={(n) =>
                            setPageNav({ ...pageNav, currentPage: n })
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default MoviesApp;
