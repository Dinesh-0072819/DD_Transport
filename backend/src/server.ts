import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or same-server requests)
      if (!origin) return callback(null, true);
      // In development or if origin matches clientUrls, allow it
      if (
        config.nodeEnv === 'development' ||
        config.clientUrls.includes(origin) ||
        origin.includes('localhost') ||
        origin.includes('ddtransport.com') ||
        origin.includes('ddtransport.in') ||
        origin.includes('vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev/test for smooth operation
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve frontend images from ../frontend/public/images if available
const publicImagesPath = path.join(__dirname, '../../frontend/public/images');
app.use('/images', express.static(publicImagesPath));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'DD Transport API Engine',
    domain: 'https://ddtransport.com',
  });
});

// REST API root
app.use('/api', apiRouter);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found`,
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server',
    ...(config.nodeEnv === 'development' ? { stack: err.stack } : {}),
  });
});

// Start Server
async function startServer() {
  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(`=================================================`);
    console.log(`🚛 DD TRANSPORT BACKEND REST API ENGINE RUNNING`);
    console.log(`📡 URL: http://localhost:${config.port}`);
    console.log(`🏢 Official Company: DD Transport`);
    console.log(`🌐 Official Domain: https://ddtransport.com`);
    console.log(`📋 API Health Check: http://localhost:${config.port}/health`);
    console.log(`=================================================`);
  });

  return server;
}

startServer();

export default app;
