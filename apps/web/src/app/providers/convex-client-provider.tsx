"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useState } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [convex] = useState(() => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "https://dummy-convex-url.convex.cloud"));

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
