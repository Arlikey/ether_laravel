import NavLink from "@/Components/NavLink";
import { usePage } from "@inertiajs/react";

export default function Sidebar({ user }) {
    const { url, component } = usePage();
    return (
        <div className="w-20 flex flex-col py-4">
            <NavLink
                href={route("/")}
                className="flex flex-col px-4 py-2 pt-3 gap-1"
                active={component === "Home"}
            >
                <i className="bi bi-house text-xl"></i>
                <span className="text-md">Home</span>
            </NavLink>
            <NavLink
                href={route("follow.index")}
                className="flex flex-col px-4 py-2 pt-3 gap-1"
                active={component === "Follows/Follows"}
            >
                <i className="bi bi-people text-xl"></i>
                <span className="text-md">Follows</span>
            </NavLink>
            <NavLink
                href={route("profile.self")}
                className="flex flex-col px-4 py-2 pt-3 gap-1"
                active={
                    route().current("profile.index") &&
                    route().params.user === user?.username
                }
            >
                <i className="bi bi-person text-xl"></i>
                <span className="text-md">Profile</span>
            </NavLink>
        </div>
    );
}
