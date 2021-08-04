import { animated as a, useSpring } from "@react-spring/web";

export const ChatContainerModalAnimation = ({
    reverse,
    onClose,
    children,
    className,
}: any) => {
    const styles = useSpring({
        config: {
            mass: 1,
            tension: 200,
        },
        onRest: onClose,
        from: {
            right: "-100%",
            width: "0%",
        },
        to: {
            width: reverse ? "0%" : "100%",
            right: reverse ? "-100%" : "0%",
        },
    });

    return (
        <a.div style={styles} className={className}>
            {children}
        </a.div>
    );
};
