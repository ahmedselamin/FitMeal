import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // This will help get the current file's path
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3030;
const DATABASE_URL = process.env.DATABASE_URL;
//middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serving for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
