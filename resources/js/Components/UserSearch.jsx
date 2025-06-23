import { useEffect, useState } from "react";
import axios from "axios";

export default function UserSearch({ onResults }) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Debounce для уменьшения количества запросов
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery === "") {
            onResults(null); // вернуть основной контент
            return;
        }

        axios
            .get(`/api/search-users?q=${debouncedQuery}`)
            .then((res) => onResults(res.data))
            .catch(() => onResults([]));
    }, [debouncedQuery]);

    return (
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-4 py-2 rounded"
            placeholder="Search users..."
        />
    );
}
