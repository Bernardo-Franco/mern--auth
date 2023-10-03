import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(
    express.static(path.join(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('server is on');
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
