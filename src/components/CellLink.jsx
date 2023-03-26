import React, { useState } from "react";
import { Link } from "@mui/material";

const CellLink = ({ href, children }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={href}
      underline="hover"
      style={{
        textOverflow: "ellipsis",
        overflow: hover ? "visible" : "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {children}
    </Link>
  );
};

export default CellLink;
