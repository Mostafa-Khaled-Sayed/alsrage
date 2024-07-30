const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors'); // استيراد مكتبة CORS
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إعداد CORS
app.use(cors({
    origin: 'https://alsrage.vercel.app', // السماح بالطلبات من هذا النطاق
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // السماح بالطرق المطلوبة
    allowedHeaders: ['Content-Type', 'Authorization'], // السماح بالرؤوس المطلوبة
  }));
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      console.log('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded successfully:', req.file);
    res.status(200).send(`File uploaded successfully: ${req.file.path}`);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
