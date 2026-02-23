'use client'

import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function DeleteButton({
  onClick,
  children,
  className = "",
}: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        backdrop-blur-md
        bg-red-500/10
        border
        border-red-400/20
        text-red-400
        font-medium
        transition-all
        duration-300
        ease-out
        hover:bg-red-500/20
        hover:border-red-400/40
        hover:text-red-300
        hover:shadow-lg
        hover:shadow-red-500/20
        active:scale-95
        cursor-pointer
        ${className}
      `}
    >
      <Trash2
        size={18}
        className="
          transition-transform
          duration-300
          group-hover:rotate-12
          group-hover:scale-110
        "
      />

      {/* Glow effect */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
          bg-red-500/10
        "
      />
    </button>
  );
}