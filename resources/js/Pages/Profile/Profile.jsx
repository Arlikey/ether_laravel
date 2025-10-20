import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/User/UserAvatar";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditProfileModal from "./EditProfileModal";
import NavButton from "@/Components/NavButton";
import PostsGrid from "./PostsGrid";
import { FollowButton } from "@/Components/User/FollowButton";

export default function Profile({ user: initialUser }) {
    const { auth, flash } = usePage().props;
    const [user, setUser] = useState(initialUser);
    const [edit, setEdit] = useState(false);
    const [activeTab, setActiveTab] = useState("posts");

    const handleFollowChange = async (isNowFollowing) => {
        const updatedUser = {
            ...user,
            isFollowing: isNowFollowing,
            followersCount: Math.max(
                0,
                user.followersCount + (isNowFollowing ? 1 : -1)
            ),
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
                <div className="flex flex-col lg:flex-row items-center md:items-start justify-between gap-8 p-6 md:p-20">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                        <div className="rounded-full shadow-md">
                            <UserAvatar
                                avatar={user.profile.avatar}
                                alt={user.username}
                                size={192}
                            />
                        </div>

                        <div className="flex flex-col flex-1 justify-center text-center md:text-left mt-6 md:mt-0">
                            <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-4">
                                <span className="text-3xl md:text-4xl font-bold">
                                    {user.username}
                                </span>
                                <span className="text-lg text-gray-700">
                                    {user.profile.fullname}
                                </span>
                            </div>
                            <div className="flex justify-center md:justify-start gap-4 mb-6 text-gray-700">
                                <span>
                                    <strong>{user.followersCount}</strong>{" "}
                                    followers
                                </span>
                                <span>
                                    <strong>{user.followingCount}</strong>{" "}
                                    following
                                </span>
                                <span>
                                    <strong>{user.postsCount}</strong> posts
                                </span>
                            </div>
                            <p className="text-gray-700">{user.profile.bio}</p>
                        </div>
                    </div>

                    <div className="self-center">
                        {auth.user?.id === user.id ? (
                            <div className="flex md:flex-row items-center gap-4 md:gap-8 mt-6 md:mt-0">
                                <Link href={route("posts.create")}>
                                    <PrimaryButton className="gap-2">
                                        <i className="bi bi-plus-circle text-base"></i>
                                        <span className="text-base">
                                            Create post
                                        </span>
                                    </PrimaryButton>
                                </Link>
                                <button
                                    className="text-2xl text-purple-600"
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
                            <div className="mt-6 md:mt-0">
                                <FollowButton
                                    isFollowing={user.isFollowing}
                                    id={user.id}
                                    onFollowChange={handleFollowChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center border-b border-gray-300 sm:mx-8 md:mx-16">
                    <NavButton
                        className="flex-1 sm:w-1/4 sm:flex-none md:w-fit py-2 px-6 md:px-12 justify-center"
                        active={activeTab === "posts"}
                        onClick={() => setActiveTab("posts")}
                    >
                        <i className="bi bi-grid-1x2 text-xl md:text-2xl"></i>
                    </NavButton>
                    {auth.user?.id === user.id && (
                        <>
                            <NavButton
                                className="flex-1 sm:w-1/4 sm:flex-none md:w-fit py-2 px-6 md:px-12 justify-center"
                                active={activeTab === "liked"}
                                onClick={() => setActiveTab("liked")}
                            >
                                <i
                                    className={`bi bi-heart text-xl md:text-2xl`}
                                ></i>
                            </NavButton>
                            <NavButton
                                className="flex-1 sm:w-1/4 sm:flex-none md:w-fit py-2 px-6 md:px-12 justify-center"
                                active={activeTab === "bookmarks"}
                                onClick={() => setActiveTab("bookmarks")}
                            >
                                <i className="bi bi-bookmarks text-xl md:text-2xl"></i>
                            </NavButton>
                        </>
                    )}
                </div>

                <div className="flex flex-1 mx-16">
                    {activeTab === "posts" && user.posts.length > 0 ? (
                        <PostsGrid posts={user.posts} />
                    ) : activeTab === "bookmarks" &&
                      user.savedPosts.length > 0 ? (
                        <PostsGrid posts={user.savedPosts} showAuthor />
                    ) : activeTab === "liked" && user.likedPosts.length > 0 ? (
                        <PostsGrid posts={user.likedPosts} showAuthor />
                    ) : (
                        <EmptyBlock
                            type={activeTab}
                            isOwner={auth.user?.id === user.id}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function EmptyBlock({ type, isOwner }) {
    switch (type) {
        case "posts":
            return (
                <EmptyState>
                    {isOwner ? (
                        <>
                            <p>
                                You haven’t posted anything yet. <br /> ✍️ Time
                                to share your first post!
                            </p>
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
                        <p>
                            This user hasn’t posted anything yet. <br /> 📭
                            Nothing to see here for now.
                        </p>
                    )}
                </EmptyState>
            );

        case "liked":
            return (
                <EmptyState>
                    <p>
                        You haven’t liked any posts yet. <br /> ❤️ Try exploring
                        and liking some!
                    </p>
                </EmptyState>
            );

        case "bookmarks":
            return (
                <EmptyState>
                    <p>
                        You haven’t saved any posts yet. <br /> 📌 Save posts to
                        revisit them later!
                    </p>
                </EmptyState>
            );

        default:
            return null;
    }
}

function EmptyState({ children }) {
    return (
        <div className="flex flex-1 flex-col justify-center items-center gap-6 text-center text-lg sm:text-xl font-bold leading-tight text-gray-700 px-4">
            {children}
        </div>
    );
}
