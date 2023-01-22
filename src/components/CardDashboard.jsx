import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React from "react";
import { LockSharp, KeySharp, PersonSharp } from "@mui/icons-material";

const CardDashboard = ({ Title, Value, Icon }) => {
  return (
    <div>
      <Card variant="outlined" fullWidth>
        <CardHeader title={Title} avatar={Icon}></CardHeader>
        <CardContent>
          <Typography variant="h3" align="center">
            {Value}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardDashboard;
