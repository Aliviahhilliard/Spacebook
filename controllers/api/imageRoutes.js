const router = require('express').Router();
const fs = require("fs");
const { Img } = require("../../models")

router.post('/', async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`No file selected`);
    }
//req should include image file
    Img.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync("../../assets/uploads/" + req.file.filename),
      user_id: req.session.user_id,
    }).then((image) => {
      fs.writeFileSync("../../assets/tmp/" + image.name,image.data);

      return res.send(`File has been uploaded.`);
    });

  } catch (error) {
    console.log(err);
    return res.send(`Error: ${err}`);
  }
});

module.exports = { router };