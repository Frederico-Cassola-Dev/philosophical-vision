const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const postAvatar = (req, res) => {
  const { filename, originalname } = req.file;
  const newFileName = `${uuidv4()}-${originalname}`;

  fs.rename(
    `./public/assets/avatar/${filename}`,
    `./public/assets/avatar/${newFileName}`,
    (err) => {
      if (err) throw err;
    }
  );

  res.status(201).json({
    message: "Avatar uploaded",
    newUploadedAvatarFileName: newFileName,
  });
};

module.exports = { postAvatar };
