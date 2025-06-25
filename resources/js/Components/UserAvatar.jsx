export default function UserAvatar({ avatar, alt, size = 32 }) {
    const WIDTH_HEIGHT = {
        width: `${size}px`,
        height: `${size}px`,
    };

    return avatar ? (
        <img
            src={`/storage/images/${avatar}`}
            alt={alt}
            className={`rounded-full object-cover border border-gray-300`}
            style={WIDTH_HEIGHT}
        />
    ) : (
        <div
            className={`flex rounded-full bg-gray-200 relative overflow-hidden border border-gray-300`}
            style={WIDTH_HEIGHT}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                fill="currentColor"
                className="anonymous bi bi-person-fill fill-slate-400 absolute bottom-0 left-1/2"
                viewBox="0 0 18 18"
            >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
        </div>
    );
}
