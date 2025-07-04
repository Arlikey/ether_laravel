import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SaveButton({
    post,
    isSaved: initialSaved,
    id,
    onSaveChange = () => {},
}) {
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(initialSaved);

    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        try {
            if (isSaved) {
                await axios.delete(route("posts.save", post));
                setIsSaved(false);
                onSaveChange(false);
            } else {
                await axios.post(route("posts.unsave", post));
                setIsSaved(true);
                onSaveChange(true);
            }
        } catch (error) {
            console.error(error);
            toast.error("Oops! You need to log in first.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsSaved(initialSaved);
    }, [initialSaved]);
    return (
        <div>
            <button
                as="button"
                onClick={handleSave}
                disabled={loading}
            >
                <i
                    className={`bi bi-bookmark${
                        isSaved ? "-fill text-purple-600" : ""
                    } text-xl`}
                ></i>
            </button>
        </div>
    );
}
