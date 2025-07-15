import React from "react";
import ImageGallery from "./components/ImageGallery";
import Header from "./components/Header";

function GalleryPage() {
    return (
        <>
            <Header />
            <main style={{ padding: "20px" }}>
                <ImageGallery />
            </main>
        </>
    );
}

export default GalleryPage;
