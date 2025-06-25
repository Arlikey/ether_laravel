import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/UserAvatar";

export default function Profile({user}) {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <UserAvatar avatar={user.profile.avatar} alt={user.username}/>,
                title: user.username,
            }}
        >
            <Head title="Profile" />

            <div className="py-12">
                <UserAvatar avatar={user.profile.avatar} alt={user.username} size={192}/>
            </div>
        </AuthenticatedLayout>
    );
}
