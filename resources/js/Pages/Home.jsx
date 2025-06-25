import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";

export default function Home() {
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"></div>
            </div>
        </AuthenticatedLayout>
    );
}
