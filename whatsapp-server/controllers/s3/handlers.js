const { getFileStream, uploadFile } = require("../../utils/handleS3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const handleFileUpload = async (req, res) => {
  const file = req.file;
  const fileType = req.params.fileType;
  const result = await uploadFile(file, fileType);
  await unlinkFile(file.path);
  console.log(result);
  res.status(200).send({ path: `resources/${fileType}/${file.filename}` });
};

const handleGetResource = async (req, res) => {
  const { fileType, key } = req.params;
  console.log(fileType, key);
  const readStream = await getFileStream(`${fileType}/${key}`);
  readStream.pipe(res);
};

// const handleGetResourceFromServer = async (req, res) => {
//   const { key } = req.params;
//   const readStream = fs.createReadStream(`../../uploads/${key}`);
//   readStream.pipe(res);
// };

module.exports = {
  handleFileUpload,
  handleGetResource,
  handleGetResourceFromServer,
};
