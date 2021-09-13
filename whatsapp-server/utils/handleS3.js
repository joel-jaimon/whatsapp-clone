// uploads a file to s3
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const { s3 } = require("../controllers/s3/s3");

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  const putCommand = new PutObjectCommand(uploadParams);

  return await s3.send(putCommand);
};

// gets a file from s3
const getFileStream = async (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  const getCommand = new GetObjectCommand(downloadParams);

  return await (await s3.send(getCommand)).createReadStream();
};

module.exports = { getFileStream, uploadFile };
