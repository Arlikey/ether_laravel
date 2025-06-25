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

export default function Authenticated({ auth, children, header }) {
    const [searchResults, setSearchResults] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header user={auth?.user} header={header} onResults={setSearchResults} />
            <div className="body flex flex-1">
                <Sidebar user={auth?.user}/>

                <main className="flex flex-1 rounded-tl-xl border border-gray-300 overflow-y-auto max-h-[calc(100vh-4rem)]">
                    {searchResults === null ? (
                        children
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mb-4">
                                Search results:
                            </h2>
                            {searchResults.length > 0 ? (
                                <ul className="space-y-2">
                                    {searchResults.map((user) => (
                                        <li
                                            key={user.id}
                                            className="p-4 bg-white rounded shadow"
                                        >
                                            <NavLink
                                                className="font-semibold"
                                                href={route(
                                                    "profile.index",
                                                    user.username
                                                )}
                                            >
                                                {user.username}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No users found.</p>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
