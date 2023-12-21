import axios from "axios";
import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import MoviesTable from "./MoviesTable";

export interface CategoryData {
    id: number;
    name: string;
}

function MoviesApp() {
    const defaultCategory: CategoryData = { id: 0, name: "All Movies" };
    const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

    useEffect(() => {
        const controller = new AbortController();

        axios
            .get("http://localhost:5000/categories", {
                signal: controller.signal,
            })
            .then(({ data: categories }) =>
                setCategoryList([defaultCategory, ...categories])
            )
            .catch((err) => console.log(err));

        return () => {
            controller.abort();
        };
    }, []);

    const handleCategoryChange = (category: CategoryData) => {
        setSelectedCategory(category);
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
                    <MoviesTable />
                </div>
            </div>
        </div>
    );
}

export default MoviesApp;
