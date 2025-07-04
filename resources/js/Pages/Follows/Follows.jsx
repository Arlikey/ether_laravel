import { UserElement } from "@/Components/UserElement";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/Layout";
import { useState } from "react";
import NavButton from "@/Components/NavButton";

export default function Friends({
    followings: initialFollowings,
    followers: initialFollowers,
}) {
    const { auth } = usePage().props;
    const [followings, setFollowings] = useState(initialFollowings);
    const [followers, setFollowers] = useState(initialFollowers);
    const [activeTab, setActiveTab] = useState("following");

    const handleUserChange = (changedUser) => {
        setFollowings((prev) =>
            prev.some((u) => u.id === changedUser.id)
                ? prev
                      .map((u) => (u.id === changedUser.id ? changedUser : u))
                      .filter((u) => u.isFollowing)
                : changedUser.isFollowing
                ? [...prev, changedUser]
                : prev
        );
        setFollowers((prev) =>
            prev.map((u) => (u.id === changedUser.id ? changedUser : u))
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

            <div className="flex flex-1 flex-col mt-2">
                <div className="flex ml-8">
                    <NavButton
                        className="py-2 px-6"
                        active={activeTab === "following"}
                        onClick={() => setActiveTab("following")}
                    >
                        <span className="flex text-lg gap-2">
                            <i className="bi bi-person-check"></i>Following
                        </span>
                    </NavButton>
                    <NavButton
                        className="py-2 px-6"
                        active={activeTab === "followers"}
                        onClick={() => setActiveTab("followers")}
                    >
                        <span className="flex text-lg gap-2">
                            <i className="bi bi-person-add"></i>Followers
                        </span>
                    </NavButton>
                </div>
                <div className="flex flex-col flex-1 gap-4 my-6 px-8">
                    {activeTab === "following" && followings.length <= 0 ? (
                        <div className="flex flex-1 items-center justify-center">
                            <span className="text-center text-2xl text-gray-700">
                                You’re not following anyone yet. <br />
                                🔍 Find people you’d like to follow!
                            </span>
                        </div>
                    ) : (
                        followings.map((user) => (
                            <UserElement
                                key={user.id}
                                user={user}
                                onUserChange={handleUserChange}
                            />
                        ))
                    )}
                    {activeTab === "followers" && followers.length <= 0 ? (
                        <div className="flex flex-1 items-center justify-center">
                            <span className="text-center text-2xl text-gray-700">
                                You don’t have any followers yet. <br /> 🤝
                                Share something interesting to attract them!
                            </span>
                        </div>
                    ) : (
                        followers.map((user) => (
                            <UserElement
                                key={user.id}
                                user={user}
                                onUserChange={handleUserChange}
                            />
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
