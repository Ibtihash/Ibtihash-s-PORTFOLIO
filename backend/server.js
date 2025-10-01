require('dotenv').config({ path: 'c:/Users/Tashi/OneDrive/Desktop/portfolio/portfolio/backend/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));





const uri = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB database connection established successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

// Routes
const skillsRouter = require('./routes/skills');
const projectsRouter = require('./routes/projects');
const profileRouter = require('./routes/profile');

app.use('/skills', skillsRouter);
app.use('/projects', projectsRouter);
app.use('/profile', profileRouter);



app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
