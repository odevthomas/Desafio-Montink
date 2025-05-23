import React, { useState, useEffect } from "react";

interface ProductGalleryProps {
  images?: string[];
}

const ProductGallery = ({
  images = [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  ],
}: ProductGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const localStorageKey = "productGalleryState";

  useEffect(() => {
    const savedState = localStorage.getItem(localStorageKey);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const now = Date.now();

      if (parsedState.expiry > now) {
        setSelectedImageIndex(parsedState.selectedImageIndex);
      } else {
        localStorage.removeItem(localStorageKey);
      }
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      selectedImageIndex,
      expiry: Date.now() + 15 * 60 * 1000,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(stateToSave));
  }, [selectedImageIndex]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="w-full md:w-[35%] bg-white p-4 rounded-lg">
      <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
        <img
          src={images[selectedImageIndex]}
          alt={`Imagem ${selectedImageIndex + 1}`}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative min-w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImageIndex === index ? "border-blue-500" : "border-gray-200"}`}
          >
            <img
              src={image}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {selectedImageIndex === index && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
