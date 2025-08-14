// ui/form/FormError.jsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";

export default function FormError({ message }) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center gap-2 text-sm text-red-500 mt-1"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
      >
        <FaExclamationCircle className="text-red-400" />
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
