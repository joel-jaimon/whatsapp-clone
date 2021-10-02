import { getFileStream } from "../aws/getFileStream.s3";

export const handleGetResource = async (req: any, res: any) => {
  const { fileType, key }: any = req.params;
  const fileKey = `${fileType}/${key}`;
  const readStream: any = await getFileStream(fileKey);

  // if (fileType === "voice") {
  //   // Ensure there is a range given for the media file
  //   const range = req.headers.range;
  //   const contentInfo = {
  //     contentLength: parseInt(readStream.headers["content-length"]),
  //     contentType: readStream.headers["content-type"],
  //   };

  //   // Parse Range
  //   // Example: "bytes=32324-"
  //   const CHUNK_SIZE = 10 ** 6; // 1MB
  //   const start = Number(range.replace(/\D/g, ""));
  //   const end = Math.min(start + CHUNK_SIZE, contentInfo.contentLength - 1);
  //   const contentLength = end - start + 1;

  //   // Create headers
  //   const headers = {
  //     "Content-Range": `bytes ${start}-${end}/${contentInfo.contentLength}`,
  //     "Accept-Ranges": "bytes",
  //     "Content-Length": contentLength,
  //     "Cache-Control": "public, max-age=604800, immutable",
  //     // "Content-Type": "audio/mp3",
  //   };

  //   // HTTP Status 206 for Partial Content
  //   res.writeHead(206, headers);
  // } else {
  res.set("Cache-Control", "public, max-age=604800, immutable");
  // }
  //@ts-ignore
  readStream.pipe(res);
};
