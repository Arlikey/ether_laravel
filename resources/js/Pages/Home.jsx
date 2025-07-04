import Post from "@/Components/Post";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Home() {
    const { auth } = usePage().props;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePosts = async () => {
        try {
            const response = await axios.get(route("posts.index"));
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlePosts();
    }, []);
    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-house"></i>,
                title: "Home",
            }}
        >
            <Head title="Home" />

            <div className="flex flex-1 flex-col overflow-y-auto pt-4 items-center">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            children={post.description}
                        />
                    ))
                ) : (
                    <div className="flex flex-1 items-center justify-center">
                        <span className="text-center text-2xl text-gray-700">
                            Your feed is currently empty. <br /> 📰 Follow
                            people to see their posts here.
                        </span>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
