import useList from "./useList";

export interface CategoryData {
    id: number;
    name: string;
}

export default () => {
    const defaultCategory: CategoryData = { id: 0, name: "All Movies" };
    const { genricList, setGenricList } = useList<CategoryData>("/categories");
    return {
        categoryList: [defaultCategory, ...genricList],
        setCategoryList: setGenricList,
        defaultCategory,
    };
};
