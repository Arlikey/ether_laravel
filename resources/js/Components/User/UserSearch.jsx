import { useEffect, useState } from "react";
import axios from "axios";
import TextInput from "../TextInput";

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
            })
            .catch(() => onResults([]));
    }, [debouncedQuery]);

    return (
        <div className="flex relative w-1/2 h-9">
            <i className="user-search-icon bi bi-search absolute top-1/2 left-2 text-gray-600"></i>
            <TextInput
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="user-search-input  flex-1"
                placeholder="Search users..."
            />
        </div>
    );
}
