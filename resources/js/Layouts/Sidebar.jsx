import NavLink from "@/Components/NavLink";
import { usePage } from "@inertiajs/react";

export default function Sidebar({ user, onLinkClick, className }) {
    const { component } = usePage();

    return (
        <nav className={`${className} h-full flex flex-col py-6 w-full`}>
            <NavLink
                href={route("home")}
                className="flex flex-col items-center py-3"
                active={component === "Home"}
                onClick={onLinkClick}
            >
                <i className="bi bi-house text-xl"></i>
                <span>Home</span>
            </NavLink>

            <NavLink
                href={route("follows.index")}
                className="flex flex-col items-center py-3"
                active={component === "Follows/Follows"}
                onClick={onLinkClick}
            >
                <i className="bi bi-people text-xl"></i>
                <span>Follows</span>
            </NavLink>

            <NavLink
                href={route("profile.self")}
                className="flex flex-col items-center py-3"
                active={
                    route().current("profile.index") &&
                    route().params.slug === user?.slug
                }
                onClick={onLinkClick}
            >
                <i className="bi bi-person text-xl"></i>
                <span>Profile</span>
            </NavLink>
        </nav>
    );
}