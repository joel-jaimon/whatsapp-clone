import { useContext, useRef } from "react";
import { movalbleModalContext } from "../../context/movableModalContext";
import { MinimizedVideo } from "./Components/MinimizedVideo";
import s from "./movableModal.module.scss";

const Modal = ({ type, params }: any) => {
    console.log(type, params);
    switch (type) {
        case "minimizedVideo":
            return params.orientation === "potrait" ? (
                <div className={s.minVidWrapperPotrait}>
                    <MinimizedVideo params={params} />
                </div>
            ) : (
                <div className={s.minVidWrapperLandscape}>
                    <MinimizedVideo params={params} />
                </div>
            );
        default:
            return <div />;
    }
};

export const MovableModal = () => {
    const { movableModal }: any = useContext(movalbleModalContext);
    const draggableContainerRef: any = useRef(null);

    const handleGhostPreview = (e: any) => {
        let img = new Image();
        img.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
        e.dataTransfer.setDragImage(img, 0, 0);
    };

    const handleDrag = (e: any) => {
        e.preventDefault();
        const { xOffset, yOffset } = movableModal.params;
        const { innerWidth, innerHeight } = window;

        const xPosition =
            e.clientX < xOffset
                ? xOffset
                : e.clientX > innerWidth - xOffset
                ? innerWidth - xOffset
                : e.clientX;

        const yPosition =
            e.clientY < yOffset
                ? yOffset
                : e.clientY > innerHeight - yOffset
                ? innerHeight - yOffset
                : e.clientY;

        draggableContainerRef.current.style.setProperty(
            "left",
            `${xPosition}px`
        );
        draggableContainerRef.current.style.setProperty(
            "top",
            `${yPosition}px`
        );
    };

    return (
        <div
            onDragOver={handleDrag}
            draggable={true}
            onDragStart={handleGhostPreview}
            ref={draggableContainerRef}
            className={s.movableModal}
        >
            <Modal {...movableModal} />
        </div>
    );
};
