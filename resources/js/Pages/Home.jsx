import AuthenticatedLayout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';

export default function Home({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={{
                icon: <i className='bi bi-house'></i>,
                title: 'Home'
            }}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
