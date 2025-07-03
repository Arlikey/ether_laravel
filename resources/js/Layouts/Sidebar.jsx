import NavLink from "@/Components/NavLink";
import { usePage } from "@inertiajs/react";

export default function Sidebar({ user }) {
    const { url, component } = usePage();
    return (
        <div className="w-20 flex flex-col py-4">
            <NavLink
                href={route("home")}
                className="flex flex-col px-4 py-2 pt-3 gap-1"
                active={component === "Home"}
            >
                <i className="bi bi-house text-xl"></i>
                <span className="text-md">Home</span>
            </NavLink>
            <NavLink
                href={route("follows.index")}
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
                    route().params.slug === user?.slug
                }
            >
                <i className="bi bi-person text-xl"></i>
                <span className="text-md">Profile</span>
            </NavLink>
        </div>
    );
}
