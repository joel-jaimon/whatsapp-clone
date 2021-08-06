import s from "../attachmentModal.module.scss";
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@material-ui/icons/Add";

export const PreviewFooter = () => {
    const [activeMsg, setActiveMsg] = useState(0);
    const sliderRef: any = useRef(null);

    const scrollTo = (index: number) => {
        const px = index * 64;
        sliderRef.current.scroll({
            left: px,
            behavior: "smooth",
        });
        setActiveMsg(index);
    };

    const handleLeft = () => {
        const px = (activeMsg - 1) * 64;
        sliderRef.current.scroll({
            left: px,
            behavior: "smooth",
        });
        setActiveMsg((prev) => (prev === 0 ? 0 : prev - 1));
    };

    const handleRight = () => {
        setActiveMsg((prev) => prev + 1);
        const px = (activeMsg + 1) * 64;
        sliderRef.current.scroll({
            left: px,
            behavior: "smooth",
        });
    };

    const handleKeyPress = (e: any) => {
        switch (e.keyCode) {
            case 37:
                handleLeft();
                break;
            case 39:
                handleRight();
                break;
        }
        return;
    };

    useEffect(() => {
        sliderRef.current.focus();
    }, []);

    return (
        <div className={s.previewFooter}>
            <button className={s.button}>
                <SendIcon />
            </button>
            <div ref={sliderRef} className={s.footer}>
                {[...Array(2)].map((e: any, i: number) => {
                    return (
                        <div>
                            <img
                                onClick={() => scrollTo(i)}
                                draggable={false}
                                className={
                                    i === activeMsg
                                        ? s.previewActive
                                        : s.previewDefault
                                }
                                src="https://images.unsplash.com/photo-1628158589861-713e28fea6dd?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"
                                alt="smallPreview"
                            />
                        </div>
                    );
                })}
                <div className={s.addFileButton}>
                    <input type="file" />
                    <p>
                        <AddIcon />
                    </p>
                    <small>ADD FILE</small>
                </div>
            </div>
        </div>
    );
};
