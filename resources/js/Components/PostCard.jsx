export default function PostCard({ post }) {
    return (
        <div className="rounded-xl border shadow hover:shadow-md transition-all overflow-hidden flex flex-col">
            {post.media && (
                <img
                    src={post.media[0]?.url}
                    alt=""
                    className="h-48 object-cover w-full"
                />
            )}
            <div className="p-3 flex-1 flex flex-col justify-between">
                {post.title && (
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                        {post.title}
                    </h3>
                )}
                {post.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {post.description}
                    </p>
                )}
            </div>
        </div>
    );
}
