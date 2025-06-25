import { useEffect, useState } from "react";
import axios from "axios";

export default function UserSearch({ onResults }) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery === "") {
            onResults(null);
            return;
        }

        axios
            .get(`/api/search-users?q=${debouncedQuery}`)
            .then((res) => {
                onResults(res.data);
                console.log(res.data);
            })
            .catch(() => onResults([]));
    }, [debouncedQuery]);

    return (
        <div className="flex relative w-1/2 h-9">
            <i className="user-search-icon bi bi-search absolute top-1/2 left-2 text-gray-600"></i>
            <input
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="user-search-input flex-1 border px-4 py-1 rounded bg-gray-100 text-gray-600 border-gray-400 focus:border-purple-600 focus:ring-purple-400"
                placeholder="Search users..."
            />
        </div>
    );
}
