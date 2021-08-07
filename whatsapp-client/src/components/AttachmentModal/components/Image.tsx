import s from "../attachmentModal.module.scss";

export const Image = ({ file }: any) => {
    const imageUrl = URL.createObjectURL(file);
    return <img src={imageUrl} alt="preview-img" />;
};
