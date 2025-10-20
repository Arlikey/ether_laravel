import Dropdown from "@/Components/Dropdown";
import UserAvatar from "@/Components/User/UserAvatar";
import UserSearch from "@/Components/User/UserSearch";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Header({ user, header, onResults, onToggleSidebar }) {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className="h-16 px-4 flex items-center justify-between relative z-30">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden p-2"
                >
                    <i className="bi bi-list text-2xl"></i>
                </button>

                <div className="flex items-center gap-2 text-lg sm:hidden">
                    {header?.icon}
                    <span className="font-medium text-gray-800">
                        {header?.title}
                    </span>
                </div>
            </div>

            <div className="absolute top-0 right-0 bottom-0 left-0 hidden sm:flex items-center justify-center flex-1 pointer-events-none select-none">
                <div className="flex items-center gap-2 text-lg text-gray-800">
                    {header?.icon}
                    <span className="font-semibold">{header?.title}</span>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <div className="hidden lg:block w-56 mr-4">
                    <UserSearch onResults={onResults} />
                </div>

                <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="block lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                    <i className="bi bi-search text-xl"></i>
                </button>

                {user ? (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="hidden sm:block mr-2 rounded-full cursor-pointer">
                                <UserAvatar
                                    avatar={user?.profile?.avatar}
                                    alt={user?.username}
                                    size={38}
                                />
                            </div>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route("profile.index", user.slug)}
                            >
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    <Link
                        href={route("login")}
                        className="btn-outline border border-purple-600 rounded-md p-2 px-3 text-purple-600"
                    >
                        <i className="bi bi-box-arrow-in-right"></i>
                    </Link>
                )}
            </div>

            {showSearch && (
                <div className="absolute top-16 right-0 border-t border-gray-200 p-3 lg:hidden">
                    <UserSearch onResults={onResults} />
                </div>
            )}
        </header>
    );
}
