import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/UserAvatar";
import PostCard from "@/Components/PostCard";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { FocusTrap } from "@headlessui/react";

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
                <div className="flex flex-1 border-t border-gray-300 mx-16">
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
                        {console.log(user)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
