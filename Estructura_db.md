# Diseño - planeación de estructura para la base de datos.

Este documento describe el modelado de datos en **MongoDB** para una plataforma de ventas online de productos de la canasta familiar.

---

## 1. Estrategia General

- **Unidad base estándar**: cada producto se guarda con una unidad de referencia (ej. gramos, mililitros, unidades).
- **Conversión de unidades**: cada variante define un `conversionFactor` hacia la unidad base.
- **Variants o presentaciones**: permiten diferentes empaques o medidas (ej. 250 g, 1 libra, 1 litro).
- **Inventario en base unit**: todo el stock se controla en la unidad base para mantener consistencia.
- **Pedidos con snapshot**: en las órdenes se guarda la presentación exacta comprada y su factor de conversión.

---

## 2. Colecciones Principales

### `categories`

Estructura jerárquica de categorías.

```json
{
  "_id": ObjectId(...),
  "name": "Café y té",
  "slug": "cafe-te",
  "parentId": ObjectId(...) // opcional // no va si es una producto padre.
}
```

---

### `products`

Catálogo principal, con variantes por unidad.

```json
{
  "_id": ObjectId("..."),
  "title": "Café orgánico",
  "categoryId": ObjectId("..."),
  "baseUnit": "g",                // unidad de referencia
  "variants": [
    {
      "sku": "CAF-250G",
      "label": "Paquete 250g",
      "unit": "g",
      "quantity": 250,
      "conversionFactor": 1,      // 250 g = 250 g
      "price": 14500
    },
    {
      "sku": "CAF-1LB",
      "label": "Paquete 1 libra",
      "unit": "lb",
      "quantity": 1,
      "conversionFactor": 453.6,  // 1 lb = 453.6 g
      "price": 26000
    }
  ]
}
```

---

### `inventory`

Stock siempre en **unidad base**.

```json
{
  "sku": "CAF-BASE",
  "productId": ObjectId("..."),
  "warehouseId": ObjectId("..."),
  "quantity": 10000,   // en gramos (10 kg disponibles)
  "updatedAt": ISODate(...)
}
```

---

### `orders`

Se guarda el snapshot exacto de cada ítem comprado.

```json
{
  "_id": ObjectId(...),
  "orderNumber": "ORD-2025-000123",
  "userId": ObjectId(...),
  "status": "PENDING_PAYMENT",
  "items": [
    {
      "productId": ObjectId(...),
      "sku": "CAF-1LB",
      "title": "Café orgánico - 1 libra",
      "unit": "lb",
      "quantity": 2,
      "conversionFactor": 453.6,
      "baseQuantity": 907.2,   // en gramos
      "price": 26000,
      "lineTotal": 52000
    }
  ],
  "totals": {
    "subTotal": 52000,
    "shipping": 5000,
    "grandTotal": 57000,
    "currency": "COP"
  },
  "createdAt": ISODate(...)
}
```

---
