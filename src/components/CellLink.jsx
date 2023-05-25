import React, { useState } from "react";
import { Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CellLink = ({ href, children }) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const color = useSelector((state) => state.color.value);

  return (
    <Link
      underline="hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={href}
      style={{
        textOverflow: "ellipsis",
        overflow: hover ? "visible" : "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
      color={theme.palette.primary.main}
    >
      {children}
    </Link>
  );
};

export default CellLink;
