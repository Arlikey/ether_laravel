import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { UserElement } from "@/Components/User/UserElement";
import { ToastContainer } from "react-toastify";

export default function AuthenticatedLayout({ auth, children, header }) {
    const [searchResults, setSearchResults] = useState(null);

    return (
        <div className="h-screen bg-gray-100 flex flex-col">
            <ToastContainer position="bottom-right" />
            <Header
                user={auth?.user}
                header={header}
                onResults={setSearchResults}
            />
            <div className="body flex flex-1">
                <Sidebar user={auth?.user} />

                <main className="flex flex-1 rounded-tl-xl border border-gray-300 max-h-[calc(100vh-4rem)]">
                    {searchResults === null ? (
                        children
                    ) : (
                        <>
                            <div className="flex flex-1 flex-col">
                                <p className="text-xl ml-6 mt-4 mb-6 text-gray-700">
                                    Search results:
                                </p>
                                {searchResults.length > 0 ? (
                                    <ul className="flex flex-1 mx-8 flex-col gap-3 overflow-y-auto">
                                        {searchResults.map((user) => (
                                            <li key={user.id}>
                                                <UserElement user={user} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex flex-1 items-center justify-center">
                                        <span className="text-center text-2xl text-gray-700">
                                            No results found. <br />
                                            🔎 Try a different keyword.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
