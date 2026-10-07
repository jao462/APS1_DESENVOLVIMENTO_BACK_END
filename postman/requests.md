# Exemplos para Postman

Base URL: `http://localhost:3000`

## 1. Criar categoria

POST `/categories`

Body → raw → JSON:

```json
{
  "name": "Massas",
  "description": "Pratos com massas"
}
```

## 2. Criar produto

POST `/products`

```json
{
  "category_id": "UUID_DA_CATEGORIA",
  "title": "Macarrão",
  "description": "Macarrão ao molho de tomate",
  "price": 25.9,
  "available": true,
  "active": true
}
```

## 3. Criar pedido

POST `/orders`

```json
{
  "customer_name": "João",
  "status": "pending"
}
```

## 4. Adicionar item

POST `/order-items`

```json
{
  "order_id": "UUID_DO_PEDIDO",
  "product_id": "UUID_DO_PRODUTO",
  "quantity": 2,
  "unit_price": 25.9
}
```

Depois, use GET, PUT e DELETE nos mesmos endpoints, substituindo `:id` pelo UUID retornado.
