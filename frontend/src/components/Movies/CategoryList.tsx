import axios from "axios";
import { useEffect, useState } from "react";

interface CategoryData {
    id: number;
    name: string;
}

function CategoryList() {
    const allCategory: CategoryData = { id: 0, name: "All Movies" };
    const [categoryList, setCategoryList] = useState<CategoryData[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        axios
            .get("http://localhost:5000/categories", {
                signal: controller.signal,
            })
            .then(({ data: categories }) =>
                setCategoryList([allCategory, ...categories])
            )
            .catch((err) => console.log(err));

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <ul className="list-group">
            {categoryList.map((category) => (
                <li
                    key={category.id}
                    className="list-group-item list-group-item-action clickable"
                    onClick={() => console.log(category)}
                >
                    {category.name}
                </li>
            ))}
        </ul>
    );
}

export default CategoryList;
