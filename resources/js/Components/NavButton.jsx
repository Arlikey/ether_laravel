export default function NavButton({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-purple-600 text-gray-900 active:border-purple-400 "
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") +
                className
            }
        >
            {children}
        </button>
    );
}
