import { Link } from "@inertiajs/react";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";

export default function UserElement({ user, onUnfollow, className = "" }) {
    return (
        <div
            className={`flex justify-between items-center pl-4 pr-8 py-4 border-b-2 border-gray-300 hover:bg-gray-200 duration-150 ${className}`}
        >
            <Link
                href={route("profile.index", user.username)}
                className="flex gap-2 items-center"
            >
                <UserAvatar
                    avatar={user?.profile?.avatar}
                    alt={user?.username}
                    size={64}
                />
                <div className="flex flex-col gap-2 ml-2">
                    <span className="text-lg">{user.username}</span>
                    {user.followingSince && (
                        <span className="text-sm text-gray-600 italic">
                            Following since{" "}
                            {new Date(user.followingSince).toLocaleDateString()}
                        </span>
                    )}
                    {user.followedBySince && (
                        <span className="text-sm text-gray-600 italic">
                            Followed by{" "}
                            {new Date(
                                user.followedBySince
                            ).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </Link>
            <FollowButton
                isFollowing={user.isFollowing}
                id={user.id}
                onUnfollow={onUnfollow}
            />
        </div>
    );
}
