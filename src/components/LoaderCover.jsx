import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderCover = ({ show, i = 0 }) => {
  return (
    <Backdrop
      style={{ position: "absolute", height: "100%", width: "100%" }}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 + i }}
      open={show}
    >
      <CircularProgress color="inherit" size={80} />
    </Backdrop>
  );
};

export default LoaderCover;
