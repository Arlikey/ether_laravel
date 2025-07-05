import Post from "@/Components/Post/Post";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Home() {
    const { auth, flash } = usePage().props;
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
        console.log(flash);
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

            <div className="flex flex-1 flex-col overflow-y-auto pt-4 gap-6 items-center pb-6">
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
