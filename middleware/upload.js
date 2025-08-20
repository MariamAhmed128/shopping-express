const upload = require('../config/multer');
const imageUploder = upload.array('images', 10)

const uploader = {
  fileCheck: (req, res, next) => {
    imageUploder(req, res, (err) => {
      if(err) return res.status(400).send({messaage: err});

      if(!req.files || !req.files.length) return res.status(400).send({messaage: 'Atleast 1 image should be uploaded'});
  
      if(req.files.length > 6) return res.status(400).send({messaage: 'Maximum images count should be 10'});
    
      next();
    });
  }
}

module.exports = uploader;