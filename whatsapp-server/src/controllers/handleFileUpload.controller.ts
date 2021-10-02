import { uploadFile } from "../aws/uploadFile.s3";
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

export const handleFileUpload = async (req: any, res: any) => {
  const file = req.file;
  const fileType = req.params.fileType;
  await uploadFile(file, fileType);
  await unlinkFile(file.path);
  res.status(200).send({ path: `resources/${fileType}/${file.filename}` });
};
