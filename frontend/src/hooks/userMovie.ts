import { CategoryData } from "./useCategory";
import useList from "./useList";

export interface MoviesData {
    id: number;
    name: string;
    category: CategoryData;
    liked: boolean;
}

export default () => {
    const { genricList, setGenricList } = useList<MoviesData>("/movies");
    return { moviesList: genricList, setMoviesList: setGenricList };
};
