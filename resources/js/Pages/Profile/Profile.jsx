import AuthenticatedLayout from "@/Layouts/Layout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import UserAvatar from "@/Components/UserAvatar";

export default function Profile({ auth, user }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
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
