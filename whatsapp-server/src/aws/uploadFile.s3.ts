import { PutObjectCommand } from "@aws-sdk/client-s3";
const fs = require("fs");
import { bucketName } from "../constants/s3.constants";
import { s3 } from "../config/s3.config";

export const uploadFile = async (file: any, fileType: any) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams: any = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${fileType}/${file.filename}`,
  };

  const putCommand: any = new PutObjectCommand(uploadParams);

  return await s3.send(putCommand);
};
