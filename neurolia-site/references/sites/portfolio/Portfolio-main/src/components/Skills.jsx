"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

function Skills({ name, icon, index }) {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  const { x, y } = position;
  return (
    <motion.div variants={fadeIn("right", "spring", index * 0.2, 0.75)}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ x, y }}
        transition={{
          type: "spring",
          stiffness: 190,
          damping: 5,
          mass: 0.1,
        }}
      >
        <div
          className={`cursor-pointer w-[85px] h-[85px] flex items-center justify-center`}
        >
          <img
            title={name}
            alt={name}
            src={icon?.src || icon}
            className="cursor-pointer object-contain w-full h-full max-w-[85px] max-h-[85px]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Skills;
