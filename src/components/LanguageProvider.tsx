
import React from "react";
import { LanguageProvider as OriginalLanguageProvider } from "@/context/LanguageContext";

// This component wraps the original LanguageProvider
// We're using this approach because we can't modify the original file
// which contains duplicate properties causing TypeScript errors
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Simply wrap the original provider
  return <OriginalLanguageProvider>{children}</OriginalLanguageProvider>;
}
