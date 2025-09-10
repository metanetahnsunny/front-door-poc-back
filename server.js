const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Frontend URL for CORS
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://orange-cliff-06585a403.1.azurestaticapps.net';

// Middleware
app.use(helmet());
app.use(cors({
  origin: true, // Allow all origins temporarily for debugging
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Ocp-Apim-Subscription-Key']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: require('./package.json').version,
    frontend_url: FRONTEND_URL,
    message: 'Backend server is running successfully!'
  };
  
  res.json(healthData);
});

// Test API endpoint
app.get('/api/test', (req, res) => {
  const testData = {
    message: 'API test successful!',
    timestamp: new Date().toISOString(),
    request_id: Math.random().toString(36).substr(2, 9),
    frontend_integration: 'connected',
    sample_data: {
      users: 100,
      active_sessions: 25,
      server_load: '12%'
    }
  };
  
  res.json(testData);
});

// Sample data endpoint
app.get('/api/data', (req, res) => {
  const sampleData = {
    items: [
      { id: 1, name: 'Sample Item 1', category: 'test', active: true },
      { id: 2, name: 'Sample Item 2', category: 'demo', active: false },
      { id: 3, name: 'Sample Item 3', category: 'example', active: true }
    ],
    total: 3,
    page: 1,
    timestamp: new Date().toISOString()
  };
  
  res.json(sampleData);
});

// Echo endpoint for testing POST requests
app.post('/api/echo', (req, res) => {
  res.json({
    message: 'Echo endpoint received your data',
    received_data: req.body,
    timestamp: new Date().toISOString(),
    method: req.method,
    headers: {
      'content-type': req.get('Content-Type'),
      'user-agent': req.get('User-Agent')
    }
  });
});

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    server: 'online',
    database: 'connected', // placeholder
    cache: 'active', // placeholder
    last_deployment: new Date().toISOString(),
    frontend_url: FRONTEND_URL
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    available_endpoints: [
      'GET /health',
      'GET /api/test',
      'GET /api/data',
      'POST /api/echo',
      'GET /api/status'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
});