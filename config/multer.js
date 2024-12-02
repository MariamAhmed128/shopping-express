const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  console.log('file.mimeType :: ', file.mimetype)
  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File should be JPEG, JPG or PNG'), false);
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

module.exports = upload;