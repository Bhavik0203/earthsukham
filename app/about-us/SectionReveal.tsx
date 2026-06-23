"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -32px 0px" }}
      transition={{
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial={reduce ? "visible" : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -24px 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  from?: "up" | "left" | "right";
}) {
  const variants =
    from === "left"
      ? {
          hidden: { opacity: 0, x: -48, y: 10 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.55, ease: easeOut },
          },
        }
      : from === "right"
        ? {
            hidden: { opacity: 0, x: 48, y: 10 },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.55, ease: easeOut },
            },
          }
        : itemVariants;

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}