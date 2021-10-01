import { animated as a, useSpring } from "@react-spring/web";

export const CallerInfoAnimation = ({
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
      height: "0px",
      transform: `scale(0)`,
    },
    to: {
      height: reverse ? "0px" : "250px",
      transform: reverse ? `scale(0)` : "scale(1)",
    },
  });

  return (
    <a.div style={styles} className={className}>
      {children}
    </a.div>
  );
};
