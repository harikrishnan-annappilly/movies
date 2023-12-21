import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface Props {
    liked: boolean;
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

function Like({ liked, onClick, color = "danger" }: Props) {
    const className = "h5 clickable " + (liked && "text-" + color);

    const iconProps = {
        onClick,
        className,
    };

    if (!liked) return <FaRegHeart {...iconProps} />;
    return <FaHeart {...iconProps} />;
}

export default Like;
