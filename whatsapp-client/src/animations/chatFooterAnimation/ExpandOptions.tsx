import { animated as a, useSpring } from "@react-spring/web";

export const ExpandOptions = ({ children, className, reverse }: any) => {
    const style = useSpring({
        config: {
            mass: 1,
            tension: 200,
        },
        to: {
            width: reverse ? "0%" : "100%",
        },
        from: {
            width: "0%",
        },
    });
    return (
        <a.div style={style} className={className}>
            {children}
        </a.div>
    );
};
