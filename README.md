# Sellnbuy Ecommerce

## Getting Started

1. Clone the repository
2. Install dependencies using `pnpm install`
3. Start the development server using `pnpm run dev`
4. Install [PostgreSQL](https://www.postgresql.org/download/), and paste the credentials in the `apps/api/.env` file
5. Create the database. Run `chmod +x ./apps/api/database/create-database.sh && ./apps/api/database/create-database.sh`
6. Seed the database. Run `cd apps/api && node --env-file=.env database/seed.js`

## Development

### Backend

The backend is built using [Express.js](https://expressjs.com/) and [Node.js](https://nodejs.org/en/).

### Project Structure

```
.
├── apps
│   ├── api
│   ├── web
└── package.json
```

### Scripts

- `npm run dev` to start the development server
- `npm run build` to build the project
- `npm run lint` to lint the project
- `npm run format` to format the project

## License

This project is licensed under the MIT License.

---

## 📚 Backend API Documentation

This section details the endpoints available in the backend API (`apps/api`). 

### 1. Authentication (`/api/auth`)
Authentication is handled using HTTP-Only cookies. The frontend **does not** need to store the token manually in `localStorage`. Just ensure `credentials: 'include'` is set in your frontend fetch/axios requests.

| Method | Endpoint | Protection | Description | Body / Query | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/login` | Public | Authenticates admin and sets JWT cookie | `{ "email": "...", "password": "..." }` | `200 OK: { "message": "Login successful", "admin": {...} }` |
| `POST` | `/logout` | Public | Clears the JWT cookie | None | `200 OK`: `{ "message": "Logged out successfully" }` |
| `GET` | `/me` | **Admin** | Checks if the current user is authenticated | None | `200 OK`: `{ "admin": {...} }` |

### 2. Products (`/api/product`)

| Method | Endpoint | Protection | Description | Body / Query | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Get all products (with pagination) | Query: `?page=1&limit=10` | `200 OK`: `{ "products": [...], "pagination": {...} }` |
| `GET` | `/:id` | Public | Get a single product by ID | Params: `id` | `200 OK`: Product Object |
| `POST` | `/` | **Admin** | Create a new product | `{ "title": "*", "price": "*", "description": "*", "image": "*" }` | `201 Created`: Created Product Object |
| `DELETE` | `/:id` | **Admin** | Delete a product by ID | Params: `id` | `200 OK`: `{ "message": "Product deleted successfully" }` |

*(Fields marked with `*` in the Body are strictly required).*

### 3. Orders (`/api/order`)
The order creation endpoint is public for users, while fetching orders is restricted to administrators. The total price is securely calculated on the server side.

| Method | Endpoint | Protection | Description | Body | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Public | Create a new order | `{ "phone_number": "*", "location": "*", "items": [...] }` | `201 Created`: `{ "message": "...", "order_id": 1, "total": 1500 }` |
| `GET` | `/` | **Admin** | Get a list of all orders | None | `200 OK`: `[{...}]` |

**Expected Body for `POST /`:**
```json
{
  "phone_number": "01012345678",
  "location": "Cairo, Egypt",
  "items": [
    { "product_id": 1, "quantity": 2 }
  ]
}
```

### 3. Images (`/api/images`)

| Method | Endpoint | Protection | Description | Body / Query | Expected Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/:id` | Public | Fetches and renders an image directly | Params: `id` | `200 OK`: Image binary (Content-Type: image/jpeg) |