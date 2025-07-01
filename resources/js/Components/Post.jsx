import "quill/dist/quill.snow.css";
import PostImages from "./PostImages";
import UserAvatar from "./UserAvatar";
import LikeButton from "./LikeButton";
import { useState } from "react";

export default function Post({ post: initialPost }) {
    const [post, setPost] = useState(initialPost);
    const handleLikeChange = async (isLiked) => {
        const updatedPost = {
            ...post,
            isLikedBy: isLiked,
            likesCount: post.likesCount + (isLiked ? 1 : -1),
        };
        setPost(updatedPost);
    };
    return (
        <div
            className="w-[680px] flex flex-col items-start gap-4 rounded-2xl shadow-md bg-white p-6 mb-6"
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                    <UserAvatar
                        size={36}
                        avatar={post.user?.profile.avatar}
                        alt={post.user?.username}
                    />
                    <span className="font-bold">{post.user?.username}</span>
                </div>
                <div>
                    <span className="text-gray-600">
                        {new Date(post.created_at).toDateString()}
                    </span>
                </div>
            </div>
            <div className="flex flex-col w-full gap-4">
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
                {post.description ? (
                    <div
                        className="ql-editor prose prose-neutral w-full pl-2 "
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                ) : (
                    ""
                )}
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
                        <i className="bi bi-bookmark text-xl"></i>
                    </div>
                </div>
                <div className="flex gap-6">
                    <div className="flex items-center">
                        <i className="bi bi-link-45deg text-xl"></i>
                    </div>
                    <div className="flex items-center">
                        <i className="bi bi-flag text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
