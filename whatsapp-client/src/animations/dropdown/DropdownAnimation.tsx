import { useSpring, animated as a } from "@react-spring/web";

export const DropdownAnimation = ({
    locationParams,
    className,
    sizeParam: { xOffset, yOffset, height, width },
    children,
}: any) => {
    const positionParams = {
        left:
            locationParams.x + xOffset > window.innerWidth
                ? locationParams.x - xOffset
                : locationParams.x + 2,
        top:
            locationParams.y + yOffset > window.innerHeight
                ? locationParams.y - yOffset
                : locationParams.y + 2,
    };

    const styles = useSpring({
        config: {
            mass: 1,
            tension: 400,
        },
        to: [{ width, height, opacity: 1, ...positionParams }],
        from: {
            width: 0,
            height: 0,
            opacity: 0,
            ...positionParams,
        },
    });
    return (
        <a.div
            className={className}
            style={{
                position: "absolute",
                zIndex: 200,
                ...styles,
            }}
        >
            {children}
        </a.div>
    );
};
