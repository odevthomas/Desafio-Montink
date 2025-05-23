import React from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import CepAddressLookup from "@/components/product/CepAddressLookup";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";

const ProductPage: React.FC = () => {
  const mainImage =
  "https://static.shoptimao.com.br/produtos/camisa-corinthians-i-2526-sn-torcedor-nike-masculina/28/JD8-9941-028/JD8-9941-028_zoom1.jpg?ts=1746011866&ims=1088x",
  ;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <ProductGallery />
          <div className="w-full md:w-[65%] space-y-6">
            <ProductInfo image={mainImage} />
            <CepAddressLookup />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductPage;
