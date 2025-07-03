import LikeButton from "./LikeButton";
import PostImages from "./PostImages";

export default function PostPreview({ post }) {
    return (
        <div className="flex flex-col items-start gap-4 rounded-2xl shadow-md bg-white overflow-hidden max-h-[600px]">
            {console.log(post)}
            <div className="flex flex-col w-full h-full relative">
                <span
                    className={`absolute right-4 top-2 text-lg ${
                        post.media
                            ? "text-white post-preview-text-white"
                            : "text-black post-preview-text-black"
                    }`}
                >
                    {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span
                    className={`absolute left-4 bottom-2 flex gap-2 text-lg ${
                        post.media
                            ? "text-white post-preview-text-white"
                            : "text-black post-preview-text-black"
                    }`}
                >
                    <span>{post.likesCount}</span>
                    <i
                        className={`like-button bi bi-heart${
                            post.isLikedBy ? "-fill text-red-600" : ""
                        } text-xl`}
                    ></i>
                </span>
                {post.media ? (
                    <div>
                        <img
                            className="h-full object-cover"
                            src={`../storage/posts/media/medium/${post.media.url}`}
                            alt=""
                        />
                    </div>
                ) : (
                    <div className="post-preview-no-media ql-editor prose">
                        {post.title ? (
                            <div className="text-3xl font-bold">
                                {post.title}
                            </div>
                        ) : (
                            ""
                        )}
                        {post.description ? (
                            <div
                                className="ql-editor prose prose-neutral w-full pl-2 "
                                dangerouslySetInnerHTML={{
                                    __html: post.description,
                                }}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
