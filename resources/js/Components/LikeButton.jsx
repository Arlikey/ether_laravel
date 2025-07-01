import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";

export default function LikeButton({
    post,
    isLiked: initialLiked,
    id,
    onLikeChange = () => {},
}) {
    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(initialLiked);

    const handleLike = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        try {
            if (isLiked) {
                await axios.delete(route("posts.unlike", post));
                setIsLiked(false);
                onLikeChange(false);
            } else {
                await axios.post(route("posts.like", post));
                setIsLiked(true);
                onLikeChange(true);
            }
        } catch (error) {
            console.error(error);
            toast.error("Oops! You need to log in first.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsLiked(initialLiked);
    }, [initialLiked]);
    return (
        <div>
            <button
                as="button"
                onClick={handleLike}
                disabled={loading}
                className="hover:animate-heartbeat"
            >
                <i
                    className={`like-button bi bi-heart${
                        isLiked ? "-fill text-red-600" : ""
                    } text-xl`}
                ></i>
            </button>
        </div>
    );
}
