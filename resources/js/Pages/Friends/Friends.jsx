import AuthenticatedLayout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Friends({ auth, friends }) {
    friends = friends || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                icon: <i className="bi bi-people"></i>,
                title: "Friends",
            }}
        >
            <Head title="Friends" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {friends.length > 0 ? (
                                <ul>
                                    {friends.map((friend) => (
                                        <li key={friend.id}>
                                            {friend.username}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No friends found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
