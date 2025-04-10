import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col md:flex-row bg-soothing_black items-center justify-center h-screen w-screen p-4 text-white">
      
      <div className="flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-medium font-ibm">
          {" "}
          <b className="text-3xl">Oops</b> page is not found !
        </h1>
        <p className="text-sm font-medium font-ibm">
          You just hit a route that doesn't exist...
        </p>
        <Link
          className="text-sm font-medium font-ibm text-main_primary"
          href="/"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
