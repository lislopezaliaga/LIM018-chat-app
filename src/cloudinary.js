const cloudinary = require('cloudinary');

// const { app } = require('./index');

require('dotenv').config();
// configuracion de cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// console.log(cloudinaryConfig);
// app.delete('/:public_id', async (req, res) => {
//   const { public_id } = req.params;
//   try {
//     await cloudinary.uploader.destroy(public_id);
//     res.status(200).send();
//   } catch (error) {
//     res.status(400).send();
//   }
// });
module.exports = {
  cloudinary,
};
