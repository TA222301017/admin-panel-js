import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Link,
} from "@mui/material";
import { MoreVertSharp } from "@mui/icons-material";

const CardDashboard = ({ title, value, icon, path }) => {
  return (
    <Card variant="elevation" fullWidth elevation={3}>
      <CardHeader
        title={<Typography variant="h5">{title}</Typography>}
        avatar={icon}
        action={
          <Link href={path}>
            <IconButton size="small">
              <MoreVertSharp fontSize="inherit" />
            </IconButton>
          </Link>
        }
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
