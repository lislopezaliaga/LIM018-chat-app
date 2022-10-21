const { cloudinary } = require('../cloudinary');

const deleteCloudinary = async (req, res, next) => {
  const { public_id } = req.params;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (error) {
    console.log(cloudinary);
    console.log(error);
    res.status(400).send();
    console.log('dos');
  }
};
module.exports = {
  deleteCloudinary,
};
