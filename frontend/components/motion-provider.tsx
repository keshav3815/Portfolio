"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Globally honor the user's reduced-motion preference (framer skips transforms
// for those users) without changing the rendered tree, so SSR stays consistent.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
