import React, { useState, useEffect } from "react";

interface ProductGalleryProps {
  images?: string[];
}

const ProductGallery = ({
  images = [
    "https://static.shoptimao.com.br/produtos/camisa-corinthians-i-2526-sn-torcedor-nike-masculina/28/JD8-9941-028/JD8-9941-028_zoom1.jpg?ts=1746011866&ims=1088x",
    "https://static.shoptimao.com.br/produtos/camisa-corinthians-i-2526-sn-torcedor-nike-masculina/28/JD8-9941-028/JD8-9941-028_zoom2.jpg?ts=1746011866&ims=1088x",
    "https://static.shoptimao.com.br/produtos/camisa-corinthians-i-2526-sn-torcedor-nike-masculina/28/JD8-9941-028/JD8-9941-028_zoom3.jpg?ts=1746011866&ims=1088x",
    "https://static.shoptimao.com.br/produtos/camisa-corinthians-i-2526-sn-torcedor-nike-masculina/28/JD8-9941-028/JD8-9941-028_zoom4.jpg?ts=1746011866&ims=1088x",
    "https://static.shoptimao.com.br/produtos/camisa-corinthians-i-2526-sn-torcedor-nike-masculina/28/JD8-9941-028/JD8-9941-028_zoom5.jpg?ts=1746011866&ims=1088x",
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
