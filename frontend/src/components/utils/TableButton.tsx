import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";

interface Props {
    type?: "edit" | "delete";
    onClick: () => void;
    color?:
        | "primary"
        | "secondary"
        | "success"
        | "info"
        | "warning"
        | "danger"
        | "light"
        | "dark";
}

function TableButton(props: Props) {
    const { color = "primary", type = "delete", onClick } = props;

    const Icon = type === "edit" ? FaPenToSquare : FaTrashCan;

    return (
        <button
            className={`btn btn-${color} btn-sm py-0 pb-1`}
            onClick={onClick}
        >
            {<Icon className="h6 my-0 mx-1" />}
        </button>
    );
}

export default TableButton;
