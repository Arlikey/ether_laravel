import { Link, usePage } from "@inertiajs/react";
import UserAvatar from "./UserAvatar";
import { getRelativeDate } from "@/dataFormatting";

export default function PostPreview({ post }) {
    const { auth } = usePage().props;
    const textColorClass = post.media
        ? "text-white post-preview-text-white"
        : "text-black post-preview-text-black";

    return (
        <Link
            href={route("posts.show", post.id)}
            className="flex flex-col items-start gap-4 rounded-2xl shadow-md bg-white overflow-hidden max-h-[600px]"
        >
            <div className="flex flex-col w-full h-full relative pointer-events-none">
                <span
                    className={`absolute right-4 top-2 text-lg ${textColorClass}`}
                >
                    {getRelativeDate(post.created_at)}
                </span>
                <span
                    className={`absolute left-4 bottom-2 flex gap-2 text-lg ${textColorClass}`}
                >
                    <span>{post.likesCount}</span>
                    <i
                        className={`like-button bi bi-heart${
                            post.isLikedBy ? "-fill text-red-600" : ""
                        } text-xl`}
                    ></i>
                </span>
                <span
                    className={`absolute right-4 bottom-2 text-lg ${textColorClass}`}
                >
                    <i
                        className={`like-button bi bi-bookmark${
                            post.isSavedBy ? "-fill text-purple-600" : ""
                        } text-xl`}
                    ></i>
                </span>
                {auth.user.id !== post.user.id && (
                    <div className="flex items-center gap-2 absolute left-4 top-2">
                        <UserAvatar
                            size={32}
                            avatar={post.user.profile.avatar}
                        />
                        <span className={`text-lg ${textColorClass}`}>
                            {post.user.username}
                        </span>
                    </div>
                )}
                {post.media ? (
                    <div>
                        <img
                            className="h-full object-cover"
                            src={`../storage/posts/media/medium/${post.media.url}`}
                            alt={post.title || "Post media"}
                        />
                    </div>
                ) : (
                    <div className="post-preview-no-media ql-editor prose">
                        {post.title && (
                            <div className="text-3xl font-bold">
                                {post.title}
                            </div>
                        )}
                        {post.description && (
                            <div className="ql-editor prose prose-neutral w-full pl-2 relative">
                                <div
                                    className="line-clamp-[20]"
                                    dangerouslySetInnerHTML={{
                                        __html: post.description,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}
