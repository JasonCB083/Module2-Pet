'use strict';

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const api_key = '364826398594494';
const api_secret = 'os4QWLPf4pTo5bQ86_abyqDjdGI';

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
