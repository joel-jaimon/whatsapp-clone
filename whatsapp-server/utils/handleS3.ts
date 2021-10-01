import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
const fs = require("fs");
import { s3 } from "../controllers/s3/s3";

const bucketName = process.env.AWS_S3_BUCKET_NAME;

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

// gets a file from s3
export const getFileStream = async (fileKey: any) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  const getCommand: any = new GetObjectCommand(downloadParams);
  const { Body }: any = await s3.send(getCommand);
  //@ts-ignore
  console.log(Body.headers);
  return Body;
};
