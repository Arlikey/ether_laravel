import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/UserAvatar";

export default function Profile({ user }) {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: (
                    <UserAvatar
                        avatar={user.profile.avatar}
                        alt={user.username}
                    />
                ),
                title: user.username,
            }}
        >
            <Head title="Profile" />

            <div className="flex flex-col flex-1">
                <div className="p-20 flex justify-between max-h-[352px]">
                    <div className="mr-8">
                        <UserAvatar
                            avatar={user.profile.avatar}
                            alt={user.username}
                            size={192}
                        />
                    </div>
                    <div className="flex flex-col flex-1 justify-center">
                        <div className="flex gap-6 items-center mb-4">
                            <span className="text-4xl">
                                <strong>{user.username}</strong>
                            </span>
                            <span className="text-lg text-gray-700">
                                {user.profile.fullname}
                            </span>
                        </div>
                        <div className="flex gap-4 mb-6">
                            <span className="text-gray-700">
                                <strong>{user.followersCount} followers</strong>
                            </span>
                            <span className="text-gray-700">
                                <strong>
                                    {user.followingCount} followings
                                </strong>
                            </span>
                        </div>
                        <div>
                            <p>{user.profile.bio}</p>
                        </div>
                    </div>
                    <div className="text-2xl text-purple-600">
                        <button className="flex">
                            <i className="bi bi-pencil"></i>
                        </button>
                    </div>
                </div>
                <div className="flex flex-1 border-t border-gray-300 mx-16"></div>
            </div>
        </AuthenticatedLayout>
    );
}
