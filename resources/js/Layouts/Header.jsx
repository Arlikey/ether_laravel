import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import UserAvatar from "@/Components/UserAvatar";
import UserSearch from "@/Components/UserSearch";
import { Link } from "@inertiajs/react";

export default function Header({ user, header, onResults }) {
    return (
        <div className="h-16 p-2 flex justify-between items-center">
            <div className="flex-1"></div>
            <div className="flex flex-1 gap-2.5 text-lg justify-center items-center">
                {header?.icon}
                <span>{header?.title}</span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4">
                <UserSearch onResults={onResults} />
                {user ? (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="user-profile-header mr-4 rounded-full cursor-pointer">
                                <UserAvatar
                                    avatar={user?.profile?.avatar}
                                    alt={user?.username}
                                    size={42}
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
                        className="btn-outline border border-purple-600 rounded-md p-2 px-3 text-purple-600 mr-4"
                    >
                        <i className="bi bi-box-arrow-in-right"></i>
                    </Link>
                )}
            </div>
        </div>
    );
}
