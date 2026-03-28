"use client";

import dynamic from "next/dynamic";

const AuroraBackground = dynamic(
  () => import("@/components/AuroraBackground"),
  { ssr: false }
);

export default function AuroraWrapper() {
  return <AuroraBackground />;
}
