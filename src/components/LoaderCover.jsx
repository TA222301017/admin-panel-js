import React from "react";
import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";

const LoaderCover = ({ show, i = 0 }) => {
  return (
    <Backdrop
      style={{ position: "absolute", height: "100%", width: "100%" }}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 + i }}
      open={show}
    >
      <LinearProgress color="inherit" />
    </Backdrop>
  );
};

export default LoaderCover;
