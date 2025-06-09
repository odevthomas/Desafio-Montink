# Página de Produto - Desafio Montink
![MONTINK](https://github.com/user-attachments/assets/6564936b-0c99-4dcd-9ec4-c873f7e07bb6)


## Sobre o Projeto

Este projeto é uma simulação de uma página de produto de e-commerce, desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Frontend da Montink.

## Funcionalidades

- Galeria de imagens com miniaturas clicáveis
- Informações do produto com título, preço e descrição
- Seleção de tamanho, cor e quantidade
- Consulta de CEP com API ViaCEP
- Carrinho de compras funcional
- Dados salvos por 15 minutos no localStorage
- Design responsivo para todos dispositivos

## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- API ViaCEP
- Context API para gerenciamento de estado
- LocalStorage para persistência de dados

## Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm run dev`
4. Acesse: `http://localhost:5173`

## Estrutura

- `/src/pages/ProductPage.tsx`: Página principal do produto
- `/src/components/product/ProductGallery.tsx`: Galeria de imagens interativa
- `/src/components/product/ProductInfo.tsx`: Informações e seleção de variantes
- `/src/components/product/CepAddressLookup.tsx`: Busca de CEP via API ViaCEP
- `/src/components/cart`: Componentes do carrinho de compras
- `/src/context/CartContext.tsx`: Gerenciamento de estado do carrinho

## Fluxo de Uso

1. Visualização da página do produto
2. Seleção de tamanho, cor e quantidade
3. Consulta de CEP para cálculo de frete
4. Adição ao carrinho de compras
5. Gerenciamento de itens no carrinho

Todas as seleções do usuário são salvas por 15 minutos para uso posterior, mesmo após atualização da página.
