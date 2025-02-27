import React, { ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface FunctionalErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

function FunctionalErrorBoundary({
  children,
  fallback,
}: FunctionalErrorBoundaryProps) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}

export default FunctionalErrorBoundary;
