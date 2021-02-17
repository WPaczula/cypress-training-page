import React from "react";
import Link from "./Link";

const MainPageLink = () => {
  return (
    <Link href="/" position="absolute" top={-5} left={2}>
      {"<"} Back
    </Link>
  );
};

export default MainPageLink;
