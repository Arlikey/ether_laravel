import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/UserAvatar";
import PostCard from "@/Components/PostCard";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useEffect, useState } from "react";
import { FocusTrap } from "@headlessui/react";
import { toast } from "react-toastify";
import { FollowButton } from "@/Components/FollowButton";
import Post from "@/Components/Post";
import PostPreview from "@/Components/PostPreview";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import EditProfileModal from "./EditProfileModal";

export default function Profile({ user: initialUser }) {
    const { auth, flash } = usePage().props;
    const [user, setUser] = useState(initialUser);
    const [edit, setEdit] = useState(false);

    const handleFollowChange = async (isNowFollowing) => {
        const updatedUser = {
            ...user,
            isFollowing: isNowFollowing,
            followersCount: user.followersCount + (isNowFollowing ? 1 : -1),
        };
        setUser(updatedUser);
    };

    useEffect(() => {
        if (flash.status) {
            toast.success(flash.status);
        }
    }, [flash.status]);

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
            <div className="flex flex-col flex-1 overflow-y-auto">
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
                                <strong>{user.followingCount} following</strong>
                            </span>
                            <span className="text-gray-700">
                                <strong>
                                    {user.postsCount}{" "}
                                    {user.postsCount === 1 ? "post" : "posts"}
                                </strong>
                            </span>
                        </div>
                        <div>
                            <p>{user.profile.bio}</p>
                        </div>
                    </div>
                    {auth.user?.id === user.id ? (
                        <div className="text-2xl text-purple-600">
                            <button
                                className="flex"
                                onClick={() => setEdit(!edit)}
                            >
                                <i className="bi bi-pencil hover:scale-110 transition-all duration-100"></i>
                            </button>
                            <EditProfileModal
                                edit={edit}
                                setEdit={setEdit}
                                user={user}
                                setUser={setUser}
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center  mr-12">
                            <FollowButton
                                isFollowing={user.isFollowing}
                                id={user.id}
                                onFollowChange={(isNowFollowing) =>
                                    handleFollowChange(isNowFollowing)
                                }
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-1 border-t border-gray-300 mx-16">
                    {user.posts.length > 0 ? (
                        <Masonry
                            className="px-12 py-6"
                            columnsCount={4}
                            gutter="1rem"
                        >
                            {user.posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="break-inside-avoid w-full"
                                >
                                    <PostPreview post={post} />
                                </div>
                            ))}
                        </Masonry>
                    ) : (
                        <div className="flex flex-1 flex-col justify-center items-center gap-6">
                            {auth.user?.id === user.id ? (
                                <>
                                    <div className="flex flex-col items-center gap-1">
                                        <h2 className="text-2xl">
                                            You don't have any posts yet!
                                        </h2>
                                        <p className="text-gray-700">
                                            Start creating them right now.
                                        </p>
                                    </div>
                                    <Link href={route("posts.create")}>
                                        <PrimaryButton className="gap-2">
                                            <i className="bi bi-plus-circle text-base"></i>
                                            <span className="text-base">
                                                Create post
                                            </span>
                                        </PrimaryButton>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <h1>
                                        This account doesn't have any posts yet.
                                    </h1>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
