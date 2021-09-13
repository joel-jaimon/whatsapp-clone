const { getFileStream, uploadFile } = require("../../utils/handleS3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const handleFileUpload = async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  // await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  console.log(description);
  res.send({ imagePath: `/images/${result.Key}` });
};

module.exports = { handleFileUpload };
