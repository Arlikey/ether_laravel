import PostPreview from "@/Components/Post/PostPreview";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function PostsGrid({ posts, showAuthor = false }) {
    return (
        <div className="w-full py-6">
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 650: 2, 900: 3, 1200: 4 }}
                gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
            >
                <Masonry>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="break-inside-avoid w-full"
                        >
                            <PostPreview
                                post={post}
                                showPostAuthor={showAuthor}
                            />
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}
