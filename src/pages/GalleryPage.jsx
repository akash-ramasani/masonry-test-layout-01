import React, { useEffect, useRef, useState } from "react";

import Header from "./components/Header";

import Carousel from "./components/Carousel";

import ImageGallery from "./components/ImageGallery";

export default function GalleryPage() {
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="bg-white text-gray-900">
            <Header ref={headerRef} />
            <Carousel headerHeight={headerHeight} />
            <main className="p-5 max-w-7xl mx-auto mt-10">
                <ImageGallery />
            </main>
        </div>
    );
}
