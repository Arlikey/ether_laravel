import Post from "@/Components/Post";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";

export default function Reel({ post }) {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-plus-circle"></i>,
                title: "Create Post",
            }}
        >
            <Head title="Create" />
            <div className="flex flex-1 mt-6 justify-center overflow-y-auto">
                <Post post={post} />
            </div>
        </AuthenticatedLayout>
    );
}
