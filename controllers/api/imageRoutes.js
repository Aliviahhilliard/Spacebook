const router = require('express').Router();
const fs = require("fs");
const { Img } = require("../../models")
const withAuth = require('../../utils/auth');
const upload = require('../../utils/upload.js');

const uploadFiles =  async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`No file selected`);
    }

    Img.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(__basedir + "/public/assets/uploads/" + req.file.filename),
      path: req.file.path,
      user_id: req.session.user_id,
    }).then((image) => {
      fs.writeFileSync(__basedir + "/public/assets/tmp/" + image.name, image.data);

      return res.redirect(`/profile`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

router.post('/upload', withAuth, upload.single("file"), uploadFiles);

module.exports = router;