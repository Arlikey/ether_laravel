import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FollowButton } from "./FollowButton";
import UserAvatar from "./UserAvatar";

export function UserElement({
    user: initialUser,
    className = "",
    onUserChange,
}) {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const handleFollowChange = async (isNowFollowing) => {
        const updatedUser = {
            ...user,
            isFollowing: isNowFollowing,
            followersCount: user.followersCount + (isNowFollowing ? 1 : -1),
            followingSince: isNowFollowing ? new Date().toISOString() : null,
        };
        setUser(updatedUser);
        if (onUserChange) {
            onUserChange(updatedUser);
        }
    };

    return (
        <div
            className={`min-h-[96px] transition-all duration-300 ease-in-out group hover:bg-gray-100 hover:shadow-lg rounded-lg overflow-hidden border border-gray-300 p-4 flex flex-col gap-2 ${className}`}
        >
            <div className="flex justify-between items-center relative">
                <Link
                    href={route("profile.index", user.username)}
                    className="flex gap-2 items-center flex-1"
                >
                    <div className="transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:translate-x-1/3">
                        <UserAvatar
                            avatar={user?.profile?.avatar}
                            alt={user?.username}
                            size={64}
                        />
                    </div>
                    <div className="flex flex-col flex-1 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-10">
                        <div className="flex flex-1 justify-between">
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">
                                    {user.username}
                                </span>
                                {user.followingSince && (
                                    <span className="text-sm text-gray-600 italic">
                                        Following since{" "}
                                        {new Date(
                                            user.followingSince
                                        ).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-300 ease-in-out text-sm text-gray-600">
                            <div className="mt-2 flex flex-col gap-1">
                                <div className="flex gap-4">
                                    <div>
                                        <strong>
                                            {user.followersCount} followers
                                        </strong>
                                    </div>
                                    <div>
                                        <strong>
                                            {user.followingCount} following
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="absolute top-0 right-0">
                    <FollowButton
                        isFollowing={user.isFollowing}
                        id={user.id}
                        onFollowChange={(id, isNowFollowing) =>
                            handleFollowChange(isNowFollowing)
                        }
                    />
                </div>
            </div>
        </div>
    );
}
