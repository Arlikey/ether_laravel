import "quill/dist/quill.snow.css";
import PostImages from "./PostImages";
import UserAvatar from "./UserAvatar";

export default function Post({ post }) {
    return (
        <div className="w-[680px] flex flex-col items-start gap-4 rounded-2xl shadow-md bg-white p-6 mb-6">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                    <UserAvatar size={36} />
                    <span className="font-bold">{post.user?.username}</span>
                </div>
                <div>
                    <span className="text-gray-600">25-02-2025</span>
                </div>
            </div>
            <div className="flex flex-col w-full gap-4">
                {post.title ? (
                    <div className="text-3xl font-bold">{post.title}</div>
                ) : (
                    ""
                )}
                {post.post_media.length > 0 ? (
                    <PostImages images={post.post_media} />
                ) : (
                    ""
                )}
                {post.description ? (
                    <div
                        className="prose prose-neutral w-full pl-2 "
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                ) : (
                    ""
                )}
            </div>
            <div className="w-full flex items-center justify-between text-gray-600">
                <div className="flex gap-6">
                    <div className="flex gap-2 items-center">
                        <span className="text-xl">13</span>
                        <i class="bi bi-heart text-xl"></i>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-xl">0</span>
                        <i class="bi bi-chat-dots text-xl"></i>
                    </div>
                    <div className="flex items-center">
                        <i class="bi bi-bookmark text-xl"></i>
                    </div>
                </div>
                <div className="flex gap-6">
                    <div className="flex items-center">
                        <i class="bi bi-link-45deg text-xl"></i>
                    </div>
                    <div className="flex items-center">
                        <i class="bi bi-flag text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
