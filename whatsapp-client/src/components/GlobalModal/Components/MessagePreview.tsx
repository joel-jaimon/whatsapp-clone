import s from "../globalModalStyles.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { globalModalContext } from "../../../context/globalModalContext";

// Icons
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import StarIcon from "@material-ui/icons/Star";
import ReplyIcon from "@material-ui/icons/Reply";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const MessagePreview = () => {
    const { modal, setModal }: any = useContext(globalModalContext);
    const [activeMsg, setActiveMsg] = useState(0);
    const sliderRef: any = useRef(null);
    const mainRef: any = useRef(null);

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
        mainRef.current.focus();
    }, []);

    return (
        <div
            ref={mainRef}
            tabIndex={0}
            onKeyDown={handleKeyPress}
            className={s.msgFullPreview}
        >
            <div className={s.header}>
                <div className={s.info}>
                    <img src={modal.params.src} alt="avatar" />
                    <div>
                        <strong>You @ Hum3</strong>
                        <br />
                        <small>today at 9:55 AM</small>
                    </div>
                </div>
                <div className={s.control}>
                    <ChatBubbleOutlineOutlinedIcon />
                    <StarIcon />
                    <ReplyIcon />
                    <GetAppIcon />
                    <CloseIcon onClick={() => setModal(null)} />
                </div>
            </div>
            <div className={s.main}>
                <button onClick={handleLeft}>
                    <ChevronLeftIcon />
                </button>
                <div className={s.preview}>
                    <img src={modal.params.src} alt="msg preview" />
                </div>
                <button onClick={handleRight}>
                    <ChevronRightIcon />
                </button>
            </div>
            <div ref={sliderRef} className={s.footer}>
                {[...Array(50)].map((e: any, i: number) => {
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
                                src={modal.params.src}
                                alt="smallPreview"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
