import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import UserSearch from "@/Components/UserSearch";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FollowButton from "@/Components/FollowButton";
import UserElement from "@/Components/UserElement";

export default function Authenticated({ auth, children, header }) {
    const [searchResults, setSearchResults] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header
                user={auth?.user}
                header={header}
                onResults={setSearchResults}
            />
            <div className="body flex flex-1">
                <Sidebar user={auth?.user} />

                <main className="flex flex-1 rounded-tl-xl border border-gray-300 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {searchResults === null ? (
                        children
                    ) : (
                        <>
                            <div className="flex flex-1 flex-col">
                                <p className="text-xl ml-6 mt-4 mb-6 text-gray-700">Search results:</p>
                                {searchResults.length > 0 ? (
                                    <ul className="flex flex-col flex-1">
                                        {searchResults.map((user) => (
                                            <li key={user.id}>
                                                <UserElement user={user} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No users found.</p>
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
