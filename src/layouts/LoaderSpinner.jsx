import React from "react";
import { Spinner } from "@/components/UI/spinner";

export function loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-8" />
    </div>
  );
}
export default loader;
