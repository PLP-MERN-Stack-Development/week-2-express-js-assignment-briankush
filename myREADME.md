# 🛒 Product API

A RESTful API built with Express.js for managing products, demonstrating CRUD operations, middleware, error handling, filtering, pagination, search, and statistics.

---

## 🚀 Features

- **CRUD operations** for products (Create, Read, Update, Delete)
- **Custom middleware** for logging, authentication, and validation
- **Global error handling** with custom error classes
- **Filtering** products by category
- **Pagination** for product listings
- **Search** products by name
- **Product statistics** (count by category)
- **Environment variable support** via `.env`

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd week-2-express-js-assignment-briankush
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Environment variables:**
   - Copy `.env.example` to `.env` and edit as needed:
     ```
     cp .env.example .env
     ```
   - Example contents:
     ```
     API_KEY=mysecrettoken
     PORT=3000
     ```

4. **Start the server:**
   ```sh
   npm run dev
   ```
   The server will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 🔑 Authentication

All API endpoints require an `Authorization` header:

```
Authorization: Bearer mysecrettoken
```

Replace `mysecrettoken` with your actual API key if changed in `.env`.

---

## 🛠️ API Endpoints

### Root

- `GET /`
  - Returns a welcome message.

---

### Products

- `GET /api/products`
  - List all products.
  - **Query parameters:**
    - `category` (string): Filter by category
    - `page` (number): Page number (default: 1)
    - `limit` (number): Items per page (default: 10)
  - **Example:** `/api/products?category=electronics&page=2&limit=5`

- `GET /api/products/:id`
  - Get a specific product by ID.

- `POST /api/products`
  - Create a new product.
  - **Body:**
    ```json
    {
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
    ```

- `PUT /api/products/:id`
  - Update an existing product.
  - **Body:** (same as above)

- `DELETE /api/products/:id`
  - Delete a product by ID.

---

### Search

- `GET /api/products/search?name=searchTerm`
  - Search products by name (case-insensitive).

---

### Statistics

- `GET /api/products/stats`
  - Returns a count of products by category.

---

## 🧪 Example Requests

**List products (paginated):**
```sh
curl -H "Authorization: Bearer mysecrettoken" http://localhost:3000/api/products?page=1&limit=2
```

**Create a product:**
```sh
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer mysecrettoken" \
-d '{"name":"Tablet","description":"Android tablet","price":300,"category":"electronics","inStock":true}' \
http://localhost:3000/api/products
```

**Search for a product:**
```sh
curl -H "Authorization: Bearer mysecrettoken" http://localhost:3000/api/products/search?name=laptop
```

---

## ⚠️ Error Handling

- Returns appropriate HTTP status codes and error messages for:
  - Not found resources (404)
  - Validation errors (400)
  - Unauthorized access (401)
  - Server errors (500)

---

## 🗂️ Project Structure

```
.
├── server.js
├── routes/
│   └── products.js
├── middleware/
│   └── validateProduct.js
├── errors/
│   ├── NotFoundError.js
│   └── ValidationError.js
├── .env.example
└── README.md
```

---

## 📝 Notes

- This API uses an in-memory array for products (no database).
- For production, replace with a persistent database (e.g., MongoDB).
- Use tools like Postman or curl for testing.

---

## 👤 Author

- Your Name
- [Your GitHub Profile](https://github.com/yourusername)

---