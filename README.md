# Simple Node.js Backend

Node.js Express backend for React frontend integration testing.

## Features

- CORS configured for frontend integration
- Health check endpoint
- Test API endpoints
- Azure Web App deployment ready
- Error handling and logging

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Test Endpoints
- `GET /api/test` - Basic API test
- `GET /api/data` - Sample data endpoint
- `POST /api/echo` - Echo back request data
- `GET /api/status` - Server status

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS

## Local Development

```bash
npm install
npm run dev
```

## Production

```bash
npm start
```

## Frontend Integration

Frontend URL: https://orange-cliff-06585a403.1.azurestaticapps.net

The backend is configured to accept requests from the React frontend with proper CORS settings.