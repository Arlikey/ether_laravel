import Post from "@/Components/Post";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";

export default function Reel({ post }) {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: (
                    <i
                        className={`bi bi-${
                            post.media.length > 0 ? "image" : "journal-text"
                        }`}
                    ></i>
                ),
                title: "Post",
            }}
        >
            <Head title="Create" />
            <div className="flex flex-1 py-4 justify-center overflow-y-auto">
                <Post post={post}/>
            </div>
        </AuthenticatedLayout>
    );
}
