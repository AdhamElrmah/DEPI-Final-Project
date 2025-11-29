import React from "react";
import { Spinner } from "@/components/UI/spinner";

export function loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <Spinner className="size-8" />
    </div>
  );
}
export default loader;
