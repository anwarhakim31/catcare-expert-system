"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  bgColor?: string;
  shadowColor?: string;

  loading: boolean;
}

const PushButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  bgColor = "bg-orange-500",
  shadowColor = "shadow-orange-700",
  loading,
}) => {
  return (
    <button
      type="button"
      disabled={loading}
      aria-label="button"
      className={`relative min-w-[200px]   ${shadowColor} ${bgColor} shadow-[0_6px_0_0_rgba(249,115,22,1)] rounded-md transition-all duration-500 ease-in-out flex justify-center items-center hover:translate-y-1 hover:shadow-[0_0.1px_0_0_rgba(249,115,22,1)]  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PushButton;
