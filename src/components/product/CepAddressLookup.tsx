import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface CepAddressLookupProps {
  onAddressFound?: (address: AddressData) => void;
  initialCep?: string;
}

interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const CepAddressLookup: React.FC<CepAddressLookupProps> = ({
  onAddressFound = () => {},
  initialCep = "",
}) => {
  const [cep, setCep] = useState<string>(initialCep);
  const [address, setAddress] = useState<AddressData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!initialCep) {
      const savedData = localStorage.getItem("productPageCepData");
      if (savedData) {
        try {
          const {
            cep: savedCep,
            address: savedAddress,
            timestamp,
          } = JSON.parse(savedData);
          const fifteenMinutesInMs = 15 * 60 * 1000;

          if (Date.now() - timestamp < fifteenMinutesInMs) {
            setCep(savedCep);
            setAddress(savedAddress);
            onAddressFound(savedAddress);
          } else {
            localStorage.removeItem("productPageCepData");
          }
        } catch (e) {
          console.error("Erro ao analisar dados de CEP salvos:", e);
          localStorage.removeItem("productPageCepData");
        }
      }
    }
  }, [initialCep, onAddressFound]);

  const validateCep = (cep: string): boolean => {
    const numericCep = cep.replace(/\D/g, "");
    return numericCep.length === 8;
  };

  const formatCep = (cep: string): string => {
    const numericCep = cep.replace(/\D/g, "");
    if (numericCep.length <= 5) return numericCep;
    return `${numericCep.substring(0, 5)}-${numericCep.substring(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCep(formatCep(value));
    setError("");
  };

  const lookupAddress = async () => {
    if (!validateCep(cep)) {
      setError("CEP inválido. O CEP deve conter 8 dígitos.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const numericCep = cep.replace(/\D/g, "");
      const response = await fetch(
        `https://viacep.com.br/ws/${numericCep}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        setAddress(null);
        return;
      }

      const addressData: AddressData = {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      };

      setAddress(addressData);
      onAddressFound(addressData);

      localStorage.setItem(
        "productPageCepData",
        JSON.stringify({
          cep,
          address: addressData,
          timestamp: Date.now(),
        }),
      );
    } catch (error) {
      setError("Erro ao buscar o CEP. Tente novamente.");
      console.error("Erro ao buscar endereço:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md border border-gray-200/20 w-full">
      <h3 className="text-lg font-medium mb-3">Calcular frete</h3>

      <div className="flex gap-2 mb-3">
        <Input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          className="w-40"
          disabled={isLoading}
        />
        <Button onClick={lookupAddress} disabled={isLoading || cep.length < 8}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Buscando
            </>
          ) : (
            "Buscar"
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {address && (
        <div className="text-sm space-y-1">
          <p className="font-medium">Endereço de entrega:</p>
          <p>
            {address.logradouro}
            {address.complemento ? `, ${address.complemento}` : ""}
          </p>
          <p>
            {address.bairro} - {address.localidade}/{address.uf}
          </p>
          <p className="text-green-600 mt-2">
            Frete grátis para este endereço!
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-3">
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-700"
        >
          Não sei meu CEP
        </a>
      </div>
    </div>
  );
};

export default CepAddressLookup;
