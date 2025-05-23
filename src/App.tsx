import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProductPage from "./pages/ProductPage";
import routes from "tempo-routes";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Suspense fallback={<p>Carregando...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto" element={<ProductPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </CartProvider>
  );
}

export default App;
