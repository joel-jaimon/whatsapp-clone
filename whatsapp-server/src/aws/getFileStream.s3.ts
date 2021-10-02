import { GetObjectCommand } from "@aws-sdk/client-s3";
import { bucketName } from "../constants/s3.constants";
import { s3 } from "../config/s3.config";

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
