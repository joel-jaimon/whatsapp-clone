import s from "../attachmentModal.module.scss";

export const Video = ({ file }: any) => {
  const imageUrl = URL.createObjectURL(file);
  return <video src={imageUrl} />;
};
