import FollowButton from "@/Components/FollowButton";
import UserAvatar from "@/Components/UserAvatar";
import UserElement from "@/Components/UserElement";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Friends({
    followings: initialFollowings,
    followers: initialFollowers,
}) {
    const { auth } = usePage().props;
    const [followings, setFollowings] = useState(initialFollowings);
    const [followers, setFollowers] = useState(initialFollowers);
    const [activeTab, setActiveTab] = useState("following");

    const handleUnfollow = (unfollowedId) => {
        setFollows((prev) => prev.filter((user) => user.id !== unfollowedId));
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
                <div>
                    {/* <div className="flex flex-1">
                        {follows.length > 0 ? (
                            <ul className="flex flex-col flex-1">
                                {follows.map((user) => (
                                    <li key={user.id}>
                                        <UserElement
                                            user={user}
                                            onUnfollow={() =>
                                                handleUnfollow(user.id)
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-1 flex-col justify-center items-center text-3xl gap-3 text-gray-700">
                                <span>You following no one yet. 😔</span>
                                <span>Go find friends!</span>
                            </div>
                        )}
                    </div> */}
                    <div className="mt-4">
                        {activeTab === "following" &&
                            followings.map((user) => (
                                <UserElement
                                    user={user}
                                    onUnfollow={() => handleUnfollow(user.id)}
                                />
                            ))}

                        {activeTab === "followers" &&
                            followers.map((user) => (
                                <UserElement
                                    user={user}
                                    onUnfollow={() => handleUnfollow(user.id)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
