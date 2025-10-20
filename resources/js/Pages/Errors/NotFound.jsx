import ApplicationLogo from "@/Components/ApplicationLogo";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center text-gray-700">
            <h1 className="text-7xl sm:text-8xl font-extrabold text-purple-600 drop-shadow-md">
                404
            </h1>

            <p className="text-lg sm:text-xl mt-4 text-gray-600 max-w-md">
                Oops! The page you’re looking for doesn’t exist or has been
                moved.
            </p>

            <Link href="/" className="mt-6">
                <PrimaryButton className="flex items-center gap-2 text-base sm:text-lg hover:scale-[1.02]">
                    <i className="bi bi-house"></i>
                    <span>Back to Home</span>
                </PrimaryButton>
            </Link>
        </div>
    );
}

NotFound.layout = (page) => (
    <AuthenticatedLayout
        children={page}
        header={{
            icon: <i class="bi bi-question-circle"></i>,
            title: "Page Not Found",
        }}
    />
);
