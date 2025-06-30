import Post from "@/Components/Post";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";

export default function Home({ posts }) {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-house"></i>,
                title: "Home",
            }}
        >
            <Head title="Home" />

            <div className="flex flex-1 flex-col items-center mt-4">
                {posts ? (
                    posts.map((post) => (
                        <Post post={post} children={post.description} />
                    ))
                ) : (
                    <div>No posts here yet.</div>
                )}
                {console.log(posts)}
            </div>
        </AuthenticatedLayout>
    );
}
