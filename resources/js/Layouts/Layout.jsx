import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { UserElement } from "@/Components/User/UserElement";
import { ToastContainer } from "react-toastify";

export default function AuthenticatedLayout({ auth, children, header }) {
    const [searchResults, setSearchResults] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="h-screen flex flex-col bg-gray-100 relative overflow-hidden">
            <ToastContainer position="bottom-right" />

            <Header
                user={auth?.user}
                header={header}
                onResults={setSearchResults}
                onToggleSidebar={toggleSidebar}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <aside
                    className={`fixed top-16 left-0 z-50 h-full transform transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"} 
                     md:static md:w-20 md:translate-x-0 bg-gray-100 shadow-lg md:shadow-none`}
                >
                    <Sidebar user={auth?.user} onLinkClick={closeSidebar} />
                </aside>

                {isSidebarOpen && (
                    <div
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-[1px]"
                    ></div>
                )}

                <main
                    className={`flex flex-1 flex-col overflow-y-auto md:rounded-tl-xl border border-gray-300 transition-all duration-300
                    ${isSidebarOpen ? "pointer-events-none select-none" : ""}`}
                >
                    {searchResults === null ? (
                        children
                    ) : (
                        <div className="p-4">
                            <p className="text-xl mb-6 text-gray-700">
                                Search results:
                            </p>
                            {searchResults.length > 0 ? (
                                <ul className="flex flex-col gap-3">
                                    {searchResults.map((user) => (
                                        <li key={user.id}>
                                            <UserElement user={user} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-center text-2xl text-gray-600">
                                        No results found. <br />
                                        🔎 Try a different keyword.
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
