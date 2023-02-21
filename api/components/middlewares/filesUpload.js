const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: process.env.NODE_ENV=='DEVELOPMENT' ? path.join(__dirname, "../public/images/dev") : path.join(__dirname, "../public/images"), 
      filename: (req, file, cb) => {
          const code = req.body.code || Math.random() %100
          cb(null, code+ Date.now() + path.extname(file.originalname))
    }
});

const logoStorage = multer.diskStorage({
    destination:  process.env.NODE_ENV=='DEVELOPMENT'? path.join(__dirname, "../public/logo/dev") : path.join(__dirname, "../public/logo"), 
      filename: (req, file, cb) => {
          const code = req.body.name || Math.random() %100
          cb(null, code+ Date.now() + path.extname(file.originalname))
    }
});

const FileStorage = multer.diskStorage({
    destination:  process.env.NODE_ENV=='DEVELOPMENT'? path.join(__dirname, "../public/tmp") : path.join(__dirname, "../public/tmp"), 
      filename: (req, file, cb) => {
          const code = req.body.name || Math.random() %100
          cb(null, code+ Date.now() + path.extname(file.originalname))
    }
});

exports.imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|JPG|JPEG)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

exports.logoUpload = multer({
    storage: logoStorage,
    limits: {
      fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|JPG|JPEG)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

exports.filesUpload = multer({
    storage: logoStorage,
    limits: {
      fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(xlsx)$/)) { 
         return cb(new Error('Please upload a Excel file'))
       }
     cb(undefined, true)
  }
}) 