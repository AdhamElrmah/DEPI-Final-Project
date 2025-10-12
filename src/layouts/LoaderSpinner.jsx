import { Loader } from "lucide-react";
import React from "react";

function loader() {
  return (
    <Loader className="animate-spin text-primary w-10 h-10 mx-auto my-20" />
  );
}

export default loader;
