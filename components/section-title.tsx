import React from "react";
import { motion } from "framer-motion";
const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center my-16"
    >
      <div className="inline-block">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-4"
        />
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          {title}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mt-4"
        />
      </div>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionTitle;
