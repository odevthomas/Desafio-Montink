import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "./layout/Header";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Desafio </h1>
        <p className="text-xl mb-8 bg-black/20">Bem-vindo à nossa loja online</p>
        <Button onClick={() => navigate("/produto")} size="lg">
          Ver Produto
        </Button>
      </div>
    </div>
  );
}

export default Home;
