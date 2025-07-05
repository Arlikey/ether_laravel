import FsLightbox from "fslightbox-react";
import { useState } from "react";

export default function PostImages({ images }) {
    const [toggler, setToggler] = useState(false);
    const [slide, setSlide] = useState(1);

    if (!images || images.length === 0) return null;

    const rows =
        images.length === 2
            ? "grid-rows-1"
            : images.length === 3
            ? "grid-rows-2"
            : "grid-rows-3";

    const rowspan =
        images.length === 2
            ? "row-span-1"
            : images.length === 3
            ? "row-span-2"
            : "row-span-3";

    const sources = images.map(
        (img) => `/storage/posts/media/originals/${img.url}`
    );

    const openLightbox = (index) => {
        setSlide(index + 1);
        setToggler(!toggler);
    };

    if (images.length === 1) {
        return (
            <div>
                <FsLightbox toggler={toggler} sources={sources} slide={slide} />
                <img
                    src={`/storage/posts/media/medium/${images[0].url}`}
                    className="w-full rounded object-cover max-h-[700px] cursor-pointer"
                    loading="lazy"
                    alt=""
                    onClick={() => openLightbox(0)}
                />
            </div>
        );
    }

    return (
        <div
            className={`post-images grid grid-cols-2 ${rows} gap-1 h-[600px] w-full`}
        >
            <FsLightbox toggler={toggler} sources={sources} slide={slide} />

            <div
                className={`col-span-1 ${rowspan}`}
                onClick={() => openLightbox(0)}
            >
                <img
                    src={`/storage/posts/media/medium/${images[0].url}`}
                    className="w-full h-full object-cover rounded-md cursor-pointer"
                    loading="lazy"
                    alt=""
                />
            </div>

            {images.slice(1, 4).map((img, index) => (
                <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => openLightbox(index + 1)}
                >
                    <img
                        src={`/storage/posts/media/thumbs/${img.url}`}
                        className="w-full h-full object-cover rounded-md"
                        loading="lazy"
                        alt=""
                    />
                    {index === 2 && images.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 text-white text-xl flex items-center justify-center rounded">
                            +{images.length - 4}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
