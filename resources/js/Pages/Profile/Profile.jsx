import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/User/UserAvatar";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FollowButton } from "@/Components/FollowButton";
import PostPreview from "@/Components/Post/PostPreview";
import Masonry from "react-responsive-masonry";
import EditProfileModal from "./EditProfileModal";
import NavButton from "@/Components/NavButton";

export default function Profile({ user: initialUser }) {
    const { auth, flash } = usePage().props;
    const [user, setUser] = useState(initialUser);
    const [edit, setEdit] = useState(false);
    const [activeTab, setActiveTab] = useState("posts");

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
                    <div className="mr-8 rounded-full shadow-md">
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
                        <div className="flex">
                            <div className="flex items-center mr-12">
                                <Link href={route("posts.create")}>
                                    <PrimaryButton className="gap-2">
                                        <i className="bi bi-plus-circle text-base"></i>
                                        <span className="text-base">
                                            Create post
                                        </span>
                                    </PrimaryButton>
                                </Link>
                            </div>
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
                <div className="flex items-center justify-center border-b border-gray-300 mx-16">
                    <NavButton
                        className="py-2 px-12"
                        active={activeTab === "posts"}
                        onClick={() => setActiveTab("posts")}
                    >
                        <i className="bi bi-grid-1x2 text-2xl"></i>
                    </NavButton>
                    {auth.user?.id === user.id ? (
                        <NavButton
                            className="py-2 px-12"
                            active={activeTab === "bookmarks"}
                            onClick={() => setActiveTab("bookmarks")}
                        >
                            <i className="bi bi-bookmarks text-2xl"></i>
                        </NavButton>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-1 mx-16">
                    {activeTab === "posts" && user.posts.length === 0 ? (
                        <EmptyPostsBlock isOwner={auth.user?.id === user.id} />
                    ) : activeTab === "posts" ? (
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
                    ) : activeTab === "bookmarks" &&
                      user.savedPosts.length === 0 ? (
                        <EmptySavedPostsBlock />
                    ) : (
                        <Masonry
                            className="px-12 py-6"
                            columnsCount={4}
                            gutter="1rem"
                        >
                            {user.savedPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="break-inside-avoid w-full"
                                >
                                    <PostPreview post={post} isSavings={true} />
                                </div>
                            ))}
                        </Masonry>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function EmptyPostsBlock({ isOwner }) {
    return (
        <div className="flex flex-1 flex-col justify-center items-center gap-6">
            {isOwner ? (
                <>
                    <div className="flex flex-col items-center text-xl text-gray-700 gap-1">
                        You haven’t posted anything yet. <br /> ✍️ Time to share
                        your first post!
                    </div>
                    <Link href={route("posts.create")}>
                        <PrimaryButton className="gap-2">
                            <i className="bi bi-plus-circle text-base"></i>
                            <span className="text-base">Create post</span>
                        </PrimaryButton>
                    </Link>
                </>
            ) : (
                <div className="flex flex-col items-center text-xl text-gray-700 gap-1">
                    This user hasn’t posted anything yet. 📭 Nothing to see here
                    for now.
                </div>
            )}
        </div>
    );
}

function EmptySavedPostsBlock() {
    return (
        <div className="flex flex-1 flex-col justify-center items-center gap-6 text-xl text-gray-700">
            <span className="text-center">
                You haven’t saved any posts yet. <br /> 📌 Save posts you want
                to revisit later!
            </span>
        </div>
    );
}
