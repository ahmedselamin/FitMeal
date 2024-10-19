import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 3030;
const DATABASE_URL = process.env.DATABASE_URL;
//middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})