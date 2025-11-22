import React from "react";
import { motion } from "framer-motion";

const swipeConfidenceThreshold = 10000;

const CatCard = ({ img, onSwipe }) => {
  return (
    <motion.div
      className="w-full max-w-sm h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-xl bg-white cursor-grab"
      style={{
        touchAction: "none", // better mobile gesture support
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(event, info) => {
      const offsetX = info.offset.x;

if (offsetX > 150) {
  onSwipe("right");
} else if (offsetX < -150) {
  onSwipe("left");
}

      }}
      whileTap={{ cursor: "grabbing" }}
    >
      <img
        src={img}
        alt="cat"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default CatCard;
