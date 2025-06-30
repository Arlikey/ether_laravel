import "quill/dist/quill.snow.css";
import PostImages from "./PostImages";

export default function Post({ post }) {
    const images = post.post_media;
    return (
        <div className="w-full max-w-[680px] min-w-[360px] px-4 flex flex-col items-start border rounded-md border-gray-300 mb-6">
            <div className="text-3xl font-bold">{post.title}</div>
            {post.post_media.length > 0 ? (
                <PostImages images={post.post_media} />
            ) : (
                ""
            )}
            <div
                className="prose prose-neutral w-full"
                dangerouslySetInnerHTML={{ __html: post.description }}
            />
        </div>
    );
}
