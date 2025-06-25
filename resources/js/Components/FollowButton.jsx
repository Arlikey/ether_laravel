import axios from "axios";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

export default function FollowButton({ isFollowing, id }) {
    const [following, setFollowing] = useState(isFollowing);
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        setLoading(true);
        try {
            if (following) {
                await axios.patch(route("follows.unfollow", id));
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

    return following ? (
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
