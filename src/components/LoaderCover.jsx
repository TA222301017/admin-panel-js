import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderCover = ({ show }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
    >
      <CircularProgress color="inherit" size={80} />
    </Backdrop>
  );
};

export default LoaderCover;
