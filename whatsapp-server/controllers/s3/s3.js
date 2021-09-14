const { S3Client } = require("@aws-sdk/client-s3");

const region = process.env.AWS_S3_REGION_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  accessKeyId,
  secretAccessKey,
});

module.exports = { s3 };
