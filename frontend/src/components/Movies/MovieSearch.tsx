import { FaSearchengin } from "react-icons/fa6";

interface Props {
    value: string;
    onSearch: (value: string) => void;
}

function MovieSearch({ onSearch, value }: Props) {
    return (
        <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
                <FaSearchengin />
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={value}
                onChange={(e) => onSearch(e.currentTarget.value)}
            />
        </div>
    );
}

export default MovieSearch;
