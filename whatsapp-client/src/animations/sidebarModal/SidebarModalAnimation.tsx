import { useSpring, animated as a } from "@react-spring/web";
import { useState } from "react";

export const SidebarModalAnimation = ({
    children,
    className,
    reverse,
    closeModal,
}: any) => {
    const styles = useSpring({
        config: {
            mass: 1,
            tension: 200,
        },
        onRest: closeModal,
        to: [{ left: reverse ? "-100%" : "0%" }],
        from: {
            left: "-100%",
        },
    });

    return (
        <a.div style={styles} className={className}>
            {children}
        </a.div>
    );
};
