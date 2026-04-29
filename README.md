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
