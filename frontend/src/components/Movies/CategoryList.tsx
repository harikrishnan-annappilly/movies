import { CategoryData } from "../../hooks/useCategory";

interface Props {
    categoryList: CategoryData[];
    selectedCategory: CategoryData;
    onClick: (cat: CategoryData) => void;
}

function CategoryList(props: Props) {
    const { categoryList, selectedCategory, onClick } = props;

    return (
        <ul className="list-group">
            {categoryList.map((category) => (
                <li
                    key={category.id}
                    className={
                        "list-group-item list-group-item-action clickable" +
                        (selectedCategory.id === category.id ? " active" : "")
                    }
                    onClick={() => onClick(category)}
                >
                    {category.name}
                </li>
            ))}
        </ul>
    );
}

export default CategoryList;
