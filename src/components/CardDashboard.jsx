import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";

const CardDashboard = ({ title, value, icon }) => {
  return (
    <Card variant="elevation" fullWidth elevation={3}>
      <CardHeader
        title={<Typography variant="h5">{title}</Typography>}
        avatar={icon}
      ></CardHeader>
      <CardContent>
        <Paper elevation={3}>
          <Typography
            variant="h3"
            align="center"
            style={{ float: "left", paddingBottom: "20px" }}
          >
            {value}
          </Typography>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
