import { range } from "lodash";

interface Props {
    count: number;
    select: number;
    onClick: (n: number) => void;
}
function Pagination(props: Props) {
    const { count, select, onClick } = props;
    const pages = range(1, count + 1);

    if (count < 2) return null;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((p) => (
                    <li
                        key={p}
                        className={
                            "page-item clickable" +
                            (select === p ? " active" : "")
                        }
                        onClick={() => onClick(p)}
                    >
                        <a className="page-link">{p}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
