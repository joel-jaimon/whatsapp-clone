import { useSpring, animated as a } from "@react-spring/web";

const animateFrom = (height: number, width: number, { x, y }: any) => {
    return `scale(0) translate(${(!x ? -1 : 1) * width}px, ${
        (!y ? -1 : 1) * height
    }px)`;
};

export const DropdownAnimation = ({
    locationParams,
    className,
    sizeParam: { xOffset, yOffset, height, width },
    children,
    fixedDropdown,
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
            tension: 340,
        },
        to: [{ opacity: 1, transform: `scale(1) translate(0px, 0px)` }],
        from: {
            opacity: 0,
            transform: animateFrom(height, width, {
                x: fixedDropdown,
                y: locationParams.y + yOffset > window.innerHeight,
            }),
        },
    });
    return (
        <div
            style={{
                height,
                width,
                overflow: "hidden",
                position: "absolute",
                ...positionParams,
            }}
        >
            <a.div
                className={className}
                style={{
                    zIndex: 200,
                    ...styles,
                    position: "absolute",
                }}
            >
                {children}
            </a.div>
        </div>
    );
};
