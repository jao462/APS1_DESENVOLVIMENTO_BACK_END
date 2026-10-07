# Restaurant Ordering System

Projeto da disciplina de Desenvolvimento Back-end do curso de Engenharia de Software.

**Aluno:** João Lucas Pires de Oliveira

## Tecnologias

- Node.js
- TypeScript
- Express
- Supabase / PostgreSQL
- UUID

## Objetivo

API REST para um sistema de pedidos de restaurante. O projeto permite cadastrar categorias, produtos, pedidos e itens dos pedidos, mantendo os dados no Supabase.

## Entidades e relacionamentos

- **Category:** categoria dos produtos.
- **Product:** produto vendido pelo restaurante e ligado a uma categoria.
- **Order:** pedido realizado por um cliente.
- **OrderItem:** item de um pedido, ligado a um pedido e a um produto.

Relacionamentos:

- Category 1:N Product
- Order 1:N OrderItem
- Product 1:N OrderItem

## Estrutura

```text
src/
├── config/
│   └── supabase.ts
├── controllers/
├── models/
├── repositories/
├── routes/
├── app.ts
└── server.ts

database/
└── database.sql
```

## POO

As entidades possuem classes com atributos privados, construtores, métodos de acesso e `toObject()`. Isso demonstra encapsulamento, estado e comportamento dos objetos.

## Configuração

1. Instale o Node.js 18 ou superior.
2. Execute:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SECRET_KEY=sua_chave_secreta_do_supabase
PORT=3000
```

4. No Supabase, execute o conteúdo de `database/database.sql`.
5. Inicie:

```bash
npm run dev
```

A API ficará em `http://localhost:3000`.

## Scripts

- `npm run dev` — executa em modo de desenvolvimento.
- `npm run build` — compila TypeScript.
- `npm start` — executa a versão compilada.

## Endpoints

### Categories

| Método | Endpoint | Função |
|---|---|---|
| GET | `/categories` | Lista categorias |
| GET | `/categories/:id` | Busca categoria |
| POST | `/categories` | Cria categoria |
| PUT | `/categories/:id` | Atualiza categoria |
| DELETE | `/categories/:id` | Remove categoria |

Exemplo POST:

```json
{
  "name": "Massas",
  "description": "Pratos com massas"
}
```

### Products

| Método | Endpoint | Função |
|---|---|---|
| GET | `/products` | Lista produtos |
| GET | `/products/:id` | Busca produto |
| POST | `/products` | Cria produto |
| PUT | `/products/:id` | Atualiza produto |
| DELETE | `/products/:id` | Remove produto |

Exemplo POST:

```json
{
  "category_id": "UUID_DA_CATEGORIA",
  "title": "Macarrão ao molho",
  "description": "Macarrão com molho de tomate",
  "price": 25.90,
  "image": "https://exemplo.com/macarrao.jpg",
  "available": true,
  "active": true
}
```

### Orders

| Método | Endpoint | Função |
|---|---|---|
| GET | `/orders` | Lista pedidos com seus itens |
| GET | `/orders/:id` | Busca pedido |
| POST | `/orders` | Cria pedido |
| PUT | `/orders/:id` | Atualiza pedido |
| DELETE | `/orders/:id` | Remove pedido |

Exemplo POST:

```json
{
  "customer_name": "João",
  "status": "pending"
}
```

### Order Items

| Método | Endpoint | Função |
|---|---|---|
| GET | `/order-items` | Lista itens |
| GET | `/order-items/:id` | Busca item |
| POST | `/order-items` | Cria item |
| PUT | `/order-items/:id` | Atualiza item |
| DELETE | `/order-items/:id` | Remove item |

Exemplo POST:

```json
{
  "order_id": "UUID_DO_PEDIDO",
  "product_id": "UUID_DO_PRODUTO",
  "quantity": 2,
  "unit_price": 25.90
}
```

### Teste de conexão

`GET /test-supabase` verifica se a API consegue consultar o Supabase.

## Status HTTP utilizados

- `200` — operação realizada com sucesso.
- `201` — registro criado.
- `400` — dados enviados inválidos.
- `404` — registro ou rota não encontrada.
- `500` — erro interno ou erro de comunicação com o banco.

## Observação

O arquivo `.env` não deve ser enviado ao GitHub. Use `.env.example` como modelo.
