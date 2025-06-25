import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";

export default function Friends({ follows }) {
    const { auth } = usePage().props;
    follows = follows || [];

    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-people"></i>,
                title: "Follows",
            }}
        >
            <Head title="Follows" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {follows.length > 0 ? (
                                <ul>
                                    {follows.map((follow) => (
                                        <li key={follow.id}>
                                            {follow.username}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No follows found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
