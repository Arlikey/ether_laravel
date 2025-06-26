import { UserElement } from "@/Components/UserElement";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/Layout";
import { useState } from "react";

export default function Friends({
    followings: initialFollowings,
    followers: initialFollowers,
}) {
    const { auth } = usePage().props;
    const [followings, setFollowings] = useState(initialFollowings);
    const [followers, setFollowers] = useState(initialFollowers);
    const [activeTab, setActiveTab] = useState("following");

    const handleFollowChange = (userId, isNowFollowing) => {
        const updateUser = (user) => ({
            ...user,
            isFollowing: isNowFollowing,
            followersCount: user.followersCount + (isNowFollowing ? 1 : -1),
            followingSince: isNowFollowing ? new Date().toISOString() : null,
        });

        setFollowings((prev) => {
            const exists = prev.some((u) => u.id === userId);
            if (isNowFollowing && !exists) {
                const fromFollowers = followers.find((u) => u.id === userId);
                if (fromFollowers) {
                    return [
                        {
                            ...fromFollowers,
                            isFollowing: true,
                            followersCount:
                                fromFollowers.followersCount +
                                (isNowFollowing ? 1 : -1),
                            followingSince: new Date().toISOString(),
                        },
                        ...prev,
                    ];
                }
            } else if (!isNowFollowing) {
                return prev.filter((u) => u.id !== userId);
            }
            return prev;
        });

        setFollowers((prev) =>
            prev.map((user) => (user.id === userId ? updateUser(user) : user))
        );
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-people"></i>,
                title: "Follows",
            }}
        >
            <Head title="Follows" />

            <div className="flex flex-1 flex-col">
                <div>
                    <button
                        className={`py-2 px-4 ${
                            activeTab === "following"
                                ? "border-b-2 border-purple-600 font-semibold"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("following")}
                    >
                        Following
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            activeTab === "followers"
                                ? "border-b-2 border-purple-600 font-semibold"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("followers")}
                    >
                        Followers
                    </button>
                </div>
                <div className="mt-4">
                    {(activeTab === "following" ? followings : followers).map(
                        (user) => (
                            <UserElement
                                key={user.id}
                                user={user}
                                onFollowChange={handleFollowChange}
                            />
                        )
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
