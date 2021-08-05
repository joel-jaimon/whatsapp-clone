import { useRef } from "react";
import { animated as a, useSpring } from "@react-spring/web";

export const MovableModalAnimation = ({
    movableModal,
    children,
    className,
}: any) => {
    const draggableContainerRef: any = useRef(null);

    const handleGhostPreview = (e: any) => {
        let img = new Image();
        img.src =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
        e.dataTransfer.setDragImage(img, 0, 0);
    };

    const handleDrag = (e: any) => {
        e.preventDefault();
        const {
            params: { xOffset, yOffset },
        } = movableModal;
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

    const style = useSpring({
        config: {
            mass: 1,
            tension: 200,
        },
        to: {
            opacity: 1,
        },
        from: {
            opacity: 0,
        },
    });

    return (
        <a.div
            onDragOver={handleDrag}
            draggable={true}
            onDragStart={handleGhostPreview}
            ref={draggableContainerRef}
            style={{
                ...style,
                top: movableModal?.params?.yOffset,
                left: movableModal?.params?.xOffset,
            }}
            className={className}
        >
            {children}
        </a.div>
    );
};
