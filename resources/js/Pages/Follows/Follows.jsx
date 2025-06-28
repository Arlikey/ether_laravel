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
                <div className="flex flex-col gap-4 my-6 px-8">
                    {(activeTab === "following" ? followings : followers).map(
                        (user) => (
                            <>
                                <UserElement
                                    key={user.id}
                                    user={user}
                                    onUserChange={handleUserChange}
                                />
                            </>
                        )
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
