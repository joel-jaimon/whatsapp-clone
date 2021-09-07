import { animated as a, useSpring } from "@react-spring/web";

export const EmojiDrawerAnimation = ({
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
    // onChange: (e: any) => console.log(e),
    to: {
      height: reverse ? 0 : 300,
    },
    from: {
      height: 0,
    },
  });
  return (
    <a.div style={style} className={className}>
      {children}
    </a.div>
  );
};
