import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/use-toast";

interface ProductInfoProps {
  id?: string;
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  image?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  id = "camisa-corinthians-2526",
  title = "Camisa Corinthians I 25/26 s/n Torcedor Nike Masculina - Branco+Preto",
  price = 299.9,
  description = "Camisa oficial do Corinthians para a temporada 25/26, modelo s/número, confeccionada pela Nike, com tecido leve e respirável para maior conforto durante o uso.",
  sizes = ["P", "M", "G", "GG", "XGG"],
  colors = [
    { name: "Branco", hex: "#FFFFFF" },
    { name: "Preto", hex: "#000000" },
  ],
  image = "https://static.shoptimao.com.br/produtos/camisa-corinthians-i-2526-sn-torcedor-nike-masculina/28/JD8-9941-028/JD8-9941-028_zoom1.jpg?ts=1746011866&ims=1088x",
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const localStorageKey = "productSelections";
  const { addItem } = useCart();

  useEffect(() => {
    const savedSelections = localStorage.getItem(localStorageKey);
    if (savedSelections) {
      try {
        const { size, color, qty, timestamp } = JSON.parse(savedSelections);
        const fifteenMinutesInMs = 15 * 60 * 1000;

        if (Date.now() - timestamp < fifteenMinutesInMs) {
          setSelectedSize(size);
          setSelectedColor(color);
          setQuantity(qty);
        } else {
          localStorage.removeItem(localStorageKey);
        }
      } catch (e) {
        console.error("Erro ao analisar seleções salvas:", e);
        localStorage.removeItem(localStorageKey);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedSize && selectedColor) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          size: selectedSize,
          color: selectedColor,
          qty: quantity,
          timestamp: Date.now(),
        }),
      );
    }
  }, [selectedSize, selectedColor, quantity]);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;

    const selectedColorObj = colors.find((c) => c.name === selectedColor);
    const colorName = selectedColorObj ? selectedColorObj.name : selectedColor;

    addItem({
      id,
      title,
      price,
      size: selectedSize,
      color: colorName,
      quantity,
      image,
    });

    toast({
      title: "Produto adicionado ao carrinho",
      description: `${title} - Tamanho: ${selectedSize}, Cor: ${colorName}`,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 w-full">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="text-2xl font-bold text-blue-600 mb-4">
        {formatPrice(price)}
      </div>

      <div className="mb-6">
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Tamanho</h3>
        <RadioGroup
          value={selectedSize}
          onValueChange={handleSizeChange}
          className="flex flex-wrap gap-3"
        >
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <RadioGroupItem value={size} id={`size-${size}`} />
              <Label
                htmlFor={`size-${size}`}
                className="cursor-pointer px-3 py-1 border rounded-md hover:bg-gray-50"
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Cor</h3>
        <RadioGroup
          value={selectedColor}
          onValueChange={handleColorChange}
          className="flex flex-wrap gap-3"
        >
          {colors.map((color) => (
            <div key={color.name} className="flex items-center space-x-2">
              <RadioGroupItem value={color.name} id={`color-${color.name}`} />
              <Label
                htmlFor={`color-${color.name}`}
                className="cursor-pointer flex items-center gap-2"
              >
                <span
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Quantidade</h3>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
          >
            +
          </Button>
        </div>
      </div>

      <Button
        className="w-full mt-4"
        size="lg"
        disabled={!selectedSize || !selectedColor}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Adicionar ao Carrinho
      </Button>
    </div>
  );
};

export default ProductInfo;
