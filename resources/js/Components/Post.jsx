import "quill/dist/quill.snow.css";
import PostImages from "./PostImages";
import UserAvatar from "./UserAvatar";
import LikeButton from "./LikeButton";
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import SaveButton from "./SaveButton";
import { getRelativeDate } from "@/dataFormatting";
import Dropdown from "./Dropdown";
import axios from "axios";
import { toast } from "react-toastify";

export default function Post({ post: initialPost, className = "" }) {
    const { auth } = usePage().props;
    const [post, setPost] = useState(initialPost);
    const handleLikeChange = async (isLiked) => {
        const updatedPost = {
            ...post,
            isLikedBy: isLiked,
            likesCount: post.likesCount + (isLiked ? 1 : -1),
        };
        setPost(updatedPost);
    };
    const handleSaveChange = async (isSaved) => {
        const updatedPost = {
            ...post,
            isSavedBy: isSaved,
        };
        setPost(updatedPost);
    };

    const handlePostDestroy = async (post) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await axios.delete(
                route("posts.destroy", post.id)
            );
            router.visit(route("home"));
        } catch (error) {
            toast.error("Failed to delete post");
        }
    };

    const handleCopyLink = () => {
        const url = route("posts.show", post.id);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(url)
                .then(() => toast.success("Link copied!"))
                .catch(() => toast.error("Failed to copy link"));
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
                toast.success("Link copied!");
            } catch (err) {
                toast.error("Failed to copy link.");
            }
            document.body.removeChild(textArea);
        }
    };
    return (
        <div
            className={`w-[680px] flex flex-col items-start gap-4 rounded-2xl shadow-md bg-white p-6 max-h-[90vh] h-fit ${className}`}
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <Link
                        href={route("profile.index", post.user.slug)}
                        className="flex gap-3 items-center"
                    >
                        <UserAvatar
                            size={36}
                            avatar={post.user?.profile?.avatar}
                            alt={post.user?.username}
                        />
                        <span className="font-bold">{post.user?.username}</span>
                    </Link>
                    <div className="rounded-full w-1 h-1 bg-gray-500"></div>
                    <div>
                        <span className="text-gray-600">
                            {getRelativeDate(post.created_at)}
                        </span>
                    </div>
                </div>
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="text-xl text-gray-700 cursor-pointer hover:scale-110 hover:text-gray-900 active:text-gray-700 transition duration-100">
                            <i className="bi bi-three-dots"></i>
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link
                            href={route("posts.show", post.id)}
                            as="button"
                        >
                            Go to Post
                        </Dropdown.Link>
                        {auth.user?.id === post.user.id && (
                            <Dropdown.Link
                                onClick={() => handlePostDestroy(post)}
                                as="button"
                                className="flex text-red-600 gap-2"
                            >
                                <i className="bi bi-trash3"></i>Delete
                            </Dropdown.Link>
                        )}
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <div className="flex flex-col w-full gap-4 overflow-y-auto">
                {post.title ? (
                    <div className="text-3xl font-bold">{post.title}</div>
                ) : (
                    ""
                )}
                {post.media.length > 0 ? (
                    <PostImages images={post.media} />
                ) : (
                    ""
                )}
                <div>
                    {post.description && (
                        <div
                            className="ql-editor prose prose-neutral w-full pl-2"
                            dangerouslySetInnerHTML={{
                                __html: post.description,
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="w-full flex items-center justify-between text-gray-600">
                <div className="flex gap-6">
                    <div className="flex gap-2 items-center">
                        <span className="text-xl tabular-nums">
                            {post.likesCount}
                        </span>
                        <LikeButton
                            post={post}
                            isLiked={post.isLikedBy}
                            onLikeChange={(isLikedBy) =>
                                handleLikeChange(isLikedBy)
                            }
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-xl tabular-nums">0</span>
                        <i className="bi bi-chat-dots text-xl"></i>
                    </div>
                    <div className="flex items-center">
                        <SaveButton
                            post={post}
                            isSaved={post.isSavedBy}
                            onSaveChange={(isSavedBy) =>
                                handleSaveChange(isSavedBy)
                            }
                        />
                    </div>
                </div>
                <div className="flex gap-6">
                    <div
                        className="flex items-center text-xl text-gray-700 cursor-pointer hover:scale-110 hover:text-gray-900 active:text-gray-700 transition duration-100"
                        onClick={handleCopyLink}
                    >
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className="flex items-center">
                        <i className="bi bi-flag text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
