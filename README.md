# Seyahat Frontend

Travel Planner backend'i ile konusan React tabanli frontend uygulamasi.

## Tech Stack
- React
- React Router
- Axios
- CSS-in-JS (inline styles)

## Setup
```bash
npm install
cp .env.example .env
```

`.env` icindeki API URL:

```env
REACT_APP_API_URL=http://localhost:8080
```

## Run
```bash
npm start
```

Uygulama: `http://localhost:3000`

## Build
```bash
npm run build
```

## Pages
- `/login`
- `/register`
- `/destinations`

## CI
`frontend-ci.yml` workflow'u:
- Node 20 kurar
- `npm ci` calistirir
- `npm run build` ile build doğrular
