import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";

export function FollowButton({
    isFollowing: initialFollowing,
    id,
    onFollowChange = () => {},
}) {
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(initialFollowing);

    const handleFollow = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        try {
            if (isFollowing) {
                await axios.patch(route("follows.unfollow", id));
                setIsFollowing(false);
                onFollowChange(false);
            } else {
                await axios.patch(route("follows.follow", id));
                setIsFollowing(true);
                onFollowChange(true);
            }
        } catch (error) {
            console.error(error);
            toast.error("Oops! You need to log in first.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsFollowing(initialFollowing);
    }, [initialFollowing]);

    return (
        <PrimaryButton
            as="button"
            onClick={handleFollow}
            disabled={loading}
            className="flex gap-1 w-fit justify-center"
        >
            <i
                className={`bi ${
                    isFollowing ? "bi-x-circle" : "bi-plus-circle"
                } text-base`}
            />
            <span className="hidden sm:inline">{isFollowing ? "Unfollow" : "Follow"}</span>
        </PrimaryButton>
    );
}
