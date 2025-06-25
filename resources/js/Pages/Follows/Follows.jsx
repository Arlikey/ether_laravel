import FollowButton from "@/Components/FollowButton";
import UserAvatar from "@/Components/UserAvatar";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Friends({ follows }) {
    const { auth } = usePage().props;
    follows = follows || [];

    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-people"></i>,
                title: "Follows",
            }}
        >
            <Head title="Follows" />

            <div className="flex flex-1">
                {follows.length > 0 ? (
                    <ul className="flex flex-col flex-1">
                        {follows.map((user) => (
                            <li
                                className="flex justify-between items-center pl-4 pr-8 py-4 border-b border-gray-300"
                                key={user.id}
                            >
                                <div className="flex gap-2 items-center">
                                    <UserAvatar
                                        avatar={user?.profile?.avatar}
                                        alt={user?.username}
                                        size={64}
                                    />
                                    <span>{user.username}</span>
                                </div>
                                <FollowButton
                                    isFollowing={user.isFollowing}
                                    id={user.id}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No follows found.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
