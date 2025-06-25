import axios from "axios";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

export default function FollowButton({
    isFollowing: Following,
    id,
    onUnfollow = () => {},
}) {
    const [isFollowing, setFollowing] = useState(Following);
    const [loading, setLoading] = useState(false);

    const handleFollow = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        try {
            if (isFollowing) {
                await axios.patch(route("follows.unfollow", id));
                onUnfollow();
                setFollowing(false);
            } else {
                await axios.patch(route("follows.follow", id));
                setFollowing(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return isFollowing ? (
        <PrimaryButton
            as="button"
            onClick={handleFollow}
            disabled={loading}
            className="flex gap-1 w-32 justify-center"
        >
            <i className="bi bi-x-circle text-base"></i>
            <span>Unfollow</span>
        </PrimaryButton>
    ) : (
        <PrimaryButton
            as="button"
            onClick={handleFollow}
            disabled={loading}
            className="flex gap-1 w-32 justify-center"
        >
            <i className="bi bi-plus-circle text-base"></i>
            <span>Follow</span>
        </PrimaryButton>
    );
}
