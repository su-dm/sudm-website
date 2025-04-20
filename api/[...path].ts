import express, { Request, Response } from 'express';
import { registerRoutes } from '../server/routes';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
try {
  registerRoutes(app);
} catch (e) {
  console.error("Error registering routes:", e);
}

// Error handling
app.use((err: any, _req: Request, res: Response, _next: express.NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// For serverless function handler
export default function handler(req: Request, res: Response) {
  return new Promise<void>((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}