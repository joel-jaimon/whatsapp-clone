import { animated as a, useSpring } from "@react-spring/web";

export const RecorderAnimation = ({
    children,
    className,
    reverse,
    onClose,
}: any) => {
    const style = useSpring({
        config: {
            mass: 1,
            tension: 200,
        },
        onRest: onClose,
        to: {
            width: reverse ? 40 : 200,
            opacity: reverse ? 0 : 1,
        },
        from: {
            width: 40,
            opacity: 0,
        },
    });
    return (
        <a.div style={style} className={className}>
            {children}
        </a.div>
    );
};
