export default function PostImages({ images }) {
    if (images.length === 1) {
        return (
            <img src={`storage/${images[0].url}`} className="w-full rounded" />
        );
    }

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

    return (
        <div className={`grid grid-cols-2 ${rows} gap-2 max-h-[400px]`}>
            <div className={`col-span-1 ${rowspan}`}>
                <img
                    src={`storage/${images[0].url}`}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                />
            </div>

            {images.slice(1, 4).map((img, index) => (
                <div key={index} className="relative">
                    <img
                        src={`storage/${img.url}`}
                        className="w-full h-full object-cover rounded"
                        loading="lazy"
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
