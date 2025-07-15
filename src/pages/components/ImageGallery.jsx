import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import FadeInOnScroll from "./FadeInOnScroll";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
function ImageGallery() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);

    const fetchImages = useCallback(async () => {
        setIsLoading(true);

        const queries = ["South Indian Wedding", "South Indian Bride", "South Indian Groom", "Indian Couple", "Indian Wedding Photography"];
        const orientations = ["landscape", "portrait", "square"];
        const query = queries[Math.floor(Math.random() * queries.length)];
        const orientation =
            orientations[Math.floor(Math.random() * orientations.length)];

        try {
            const res = await axios.get(
                `https://api.pexels.com/v1/search?query=${query}&orientation=${orientation}&per_page=12&page=${page}`,
                {
                    headers: {
                        Authorization: PEXELS_API_KEY,
                    },
                }
            );
            const newPhotos = res.data.photos.map((photo) => ({
                id: photo.id,
                src: photo.src.large,
            }));
            setImages((prev) => [...prev, ...newPhotos]);
        } catch (err) {
            console.error("Error fetching images:", err);
        }

        setIsLoading(false);
    }, [page]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading) {
                setPage((prev) => prev + 1);
            }
        },
        [isLoading]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "200px",
            threshold: 0,
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [handleObserver]);

    return (
        <>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                <Masonry gutter="16px">
                    {images.map((img, i) => (
                        <FadeInOnScroll key={`${img.id}-${i}`}>
                            <img
                                src={img.src}
                                alt={`Pexels ${img.id}`}
                                style={{
                                    width: "100%",
                                    display: "block",
                                    borderRadius: "8px",
                                }}
                            />
                        </FadeInOnScroll>
                    ))}
                </Masonry>
            </ResponsiveMasonry>

            <div ref={loaderRef} style={{ height: "100px", marginTop: "20px" }} />

            {isLoading && <p style={{ textAlign: "center" }}>Loading more images...</p>}
        </>
    );
}

export default ImageGallery;
