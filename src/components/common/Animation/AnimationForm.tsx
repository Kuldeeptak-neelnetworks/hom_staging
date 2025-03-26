import { motion } from "framer-motion";

const AnimationForm = ({ children, className, fromLeft = true }: any) => {
  return (
    <motion.div
      initial={{ x: fromLeft ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0.04, 0.62, 0.23, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimationForm;
