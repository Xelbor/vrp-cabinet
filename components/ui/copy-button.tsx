'use client'

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefObject, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface CopyButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export async function HandleCopyText(ref: RefObject<HTMLDivElement | null>) {
    if (!ref.current) {
      console.error('Nothing to copy');
      return
    }
    try {
      await navigator.clipboard.writeText(ref.current.innerText)
    } catch (err) {
      console.error('Failed to copy')
    }
}

export function CopyButton({
  onClick,
  children,
  className = "",
}: CopyButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    if (onClick) onClick();

    setTimeout(() => {
      setClicked(false);
    }, 2000);
  }

  return (
    <Button
      size='icon-sm'
      variant="default"
      className={`cursor-pointer bg-transparent hover:bg-zinc-700 ${className}`}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        {!clicked && (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Copy size={18} className="text-white" />
          </motion.div>
        )}

        {clicked && (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Check size={18} className="text-green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}