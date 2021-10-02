import { animated as a, useSpring } from "@react-spring/web";

export const BlendFromBottomAnimation = ({
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
    onRest: () => onClose(),
    from: {
      bottom: "-100%",
      height: "0%",
    },
    to: {
      height: reverse ? "0%" : "100%",
      bottom: reverse ? "-100%" : "0%",
    },
  });

  return (
    <a.div style={styles} className={className}>
      {children}
    </a.div>
  );
};
