import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

const CardDashboard = ({ title, value, icon }) => {
  return (
    <div>
      <Card variant="outlined" fullWidth>
        <CardHeader
          title={<Typography variant="h5">{title}</Typography>}
          avatar={icon}
        ></CardHeader>
        <CardContent>
          <Typography
            variant="h3"
            align="center"
            style={{ float: "left", paddingBottom: "20px" }}
          >
            {value}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardDashboard;
