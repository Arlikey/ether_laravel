import NavLink from "@/Components/NavLink";
import UserAvatar from "@/Components/UserAvatar";
import { Link } from "@inertiajs/react";

export default function Header({ user, header }) {
    return (
        <div className="h-16 p-2 flex justify-between items-center">
            <div></div>
            <div className="flex gap-2.5 text-lg justify-center items-center">
                {header?.icon}
                <span>{header?.title}</span>
            </div>
            {user ? (
                <Link
                    href={route("logout")}
                    method="POST"
                    as="button"
                    className=""
                >
                    <UserAvatar
                        avatar={user?.profile?.avatar}
                        alt={user?.username}
                        size={36}
                    />
                </Link>
            ) : (
                <Link
                    href={route("login")}
                    className="btn-outline border border-purple-600 rounded-md p-2 px-3 text-purple-600 mr-4"
                >
                    <i className="bi bi-box-arrow-in-right"></i>
                </Link>
            )}
        </div>
    );
}
