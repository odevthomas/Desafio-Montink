import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "./layout/Header";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-4 animate-fade-in">
          Desafio Montink
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl bg-white/70 px-4 py-2 rounded shadow-sm backdrop-blur-md animate-slide-in">
          Bem-vindo à loja online mais prática e dinâmica. Clique abaixo para ver os produtos.
        </p>
        <Button
          onClick={() => navigate("/produto")}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-medium shadow-md transition-transform hover:scale-105"
        >
          Ver Produto
        </Button>
      </div>
    </div>
  );
}

export default Home;
