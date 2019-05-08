'use strict';

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
  cloud_name: 'dinotudor',
  api_key,
  api_secret
});


const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "picture",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 400, height: 400, crop: "limit" }]
});

const parser = multer({ storage: storage });

module.exports = parser;
