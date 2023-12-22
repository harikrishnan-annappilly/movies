import { useNavigate } from "react-router-dom";

import CategoryList from "./CategoryList";
import MoviesTable from "./MoviesTable";
import userMovie, { MoviesData } from "../../hooks/userMovie";
import useCategory, { CategoryData } from "../../hooks/useCategory";
import { useState } from "react";

function MoviesApp() {
    const { categoryList, defaultCategory } = useCategory();
    const { moviesList, setMoviesList } = userMovie();
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryData>(defaultCategory);
    const navigate = useNavigate();

    const handleCategoryChange = (category: CategoryData) => {
        setSelectedCategory(category);
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
                <div className="mx-2">
                    <MoviesTable
                        movies={moviesList}
                        onLike={handleLike}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}

export default MoviesApp;
