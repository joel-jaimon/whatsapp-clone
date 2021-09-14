import { v4 as uuidv4 } from "uuid";
import { bytesToSize } from "./byteToSize";
import compress from "react-image-file-resizer";

// get audio's info
const _audioInfo = (item: File) => {
  return new Promise((resolve) => {
    const audio: HTMLAudioElement = document.createElement("audio");
    audio.src = URL.createObjectURL(item);

    audio.onloadedmetadata = () => {
      resolve({
        extraParam: {
          url: audio.src,
          duration: Math.floor(audio.duration),
        },
        clientParams: {
          loading: true,
          tempId: uuidv4(),
        },
      });
    };
  });
};

// get video's info
const _videoInfo = (item: File) => {
  return new Promise((resolve) => {
    const video: HTMLVideoElement = document.createElement("video");
    video.src = URL.createObjectURL(item);

    // for thumbnail image
    const canvas: HTMLCanvasElement = document.createElement("canvas");

    // create a ss of image at given duration
    canvas
      .getContext("2d")!
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // convert image to blob -> then to file -> then to compressor
    canvas.toBlob((blob) => {
      //@ts-ignore
      const thumnailFile = new File([blob], "image.png");
      compressImageToMax(thumnailFile).then((thumbnail: string) => {
        video.onloadedmetadata = () => {
          return resolve({
            extraParam: {
              duration: Math.floor(video.duration),
              url: video.src,
              thumbnail,
              orientation:
                // get natural orientation for preview usage
                video.videoHeight / video.videoWidth >= 1
                  ? "potrait"
                  : "landscape",
              size: bytesToSize(item.size),
            },
            clientParams: {
              loading: true,
              tempId: uuidv4(),
            },
          });
        };
      });
    });
  });
};

// get image info
const _imgInfo = (item: File, thumbnail: string) => {
  return new Promise((resolve) => {
    // Create html tag for img and add properties to it
    const img: HTMLImageElement = document.createElement("img");
    img.src = URL.createObjectURL(item);

    img.onload = () => {
      return resolve({
        extraParam: {
          url: img.src,
          thumbnail: thumbnail,
          orientation:
            // get natural orientation for preview usage
            img.naturalHeight / img.naturalWidth >= 1 ? "potrait" : "landscape",
          size: bytesToSize(item.size),
        },
        clientParams: {
          loading: true,
          tempId: uuidv4(),
        },
      });
    };
  });
};

// compress image to maximum (for thumbnails of videos and images)
const compressImageToMax = (file: File) => {
  return new Promise((resolve) =>
    compress.imageFileResizer(
      file,
      50,
      50,
      "PNG",
      100,
      0,
      (thumbnail: string) => resolve(thumbnail),
      "base64"
    )
  );
};

// main parser
export const parseAttachmentFiles = async (files: File[]) => {
  return await Promise.all(
    Array.from(files).map(async (item: File) => {
      const fileType = item.type.split("/")[0];
      const msgType = ["image", "video"].includes(fileType)
        ? fileType
        : fileType === "audio"
        ? "voice"
        : "document";

      switch (msgType) {
        case "voice":
          const extraAud = await _audioInfo(item);
          return [item, extraAud];

        case "video":
          const extraVid = await _videoInfo(item);
          return [item, extraVid];

        case "image":
          const imgThumnail = await compressImageToMax(item);
          const extraImg = await _imgInfo(item, imgThumnail as string);
          return [item, extraImg];

        default:
          return [
            item,
            {
              extraParam: {
                loading: true,
                fileName: item.name,
                fileSize: bytesToSize(item.size),
                url: null,
              },
              clientParams: {
                loading: true,
                tempId: uuidv4(),
              },
            },
          ];
      }
    })
  );
};
