// import multer from "multer";
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp'); // Ensure './' refers to the root of your application
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

/* 
Destination specifies the directory where uploaded files will be stored
Filename determines the name of the uploaded file on the server. Here, it's set to the original name of the file.
*/

// export const upload = multer({ 
//     storage, 
// })
const upload = multer({ storage });
module.exports = upload;
//This line creates a Multer instance, passing the storage configuration.
// Now we can use upload.<properties of multer> in routes as a middleware