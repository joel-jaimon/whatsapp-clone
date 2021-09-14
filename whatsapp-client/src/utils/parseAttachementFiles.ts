import { v4 as uuidv4 } from "uuid";

const _audioInfo = (item: File) => {
  return new Promise((resolve) => {
    const audio: HTMLAudioElement = document.createElement("audio");
    audio.src = URL.createObjectURL(item);

    audio.onloadedmetadata = () => {
      resolve({
        extraParam: {
          tempId: uuidv4(),
          loading: true,
          duration: audio.duration,
        },
      });
    };
  });
};

const _videoInfo = (item: File) => {
  return new Promise((resolve) => {
    const video: HTMLVideoElement = document.createElement("video");
    video.src = URL.createObjectURL(item);

    video.onloadedmetadata = () => {
      return resolve({
        extraParam: {
          tempId: uuidv4(),
          loading: true,
          duration: video.duration,
        },
      });
    };
  });
};

export const parseAttachmentFiles = async (files: File[]) => {
  return await Promise.all(
    Array.from(files).map(async (item: File) => {
      const fileType = item.type.split("/")[0];

      switch (fileType) {
        case "audio":
          const extraAud = await _audioInfo(item);
          return [item, extraAud];
        case "video":
          const extraVid = await _videoInfo(item);
          return [item, extraVid];
        default:
          return [
            item,
            {
              extraParam: {
                tempId: uuidv4(),
                loading: true,
              },
            },
          ];
      }
    })
  );
};
