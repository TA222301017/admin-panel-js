import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import Title from "./Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Generate Order Data
function createData(ID, Name, Location, Key, Time) {
  return { ID, Name, Location, Key, Time };
}

// hardcode for temporary data
const rows = [
  createData(1, "Taruna", "Ruangan 1", "Key 01", "dump"),
  createData(2, "Elkhan", "Ruangan 2", "Key 02", "dump"),
  createData(3, "Sidartha", "Ruangan 3", "Key 03", "dump"),
  createData(4, "Taruna", "Ruangan 4", "Key 04", "dump"),
  createData(5, "Elkhan", "Ruangan 5", "Key 05", "dump"),
  createData(6, "Sidartha", "Ruangan 6", "Key 06", "dump"),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function AccessLogsList() {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>TimeStamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.Location}</TableCell>
                  <TableCell>{row.Key}</TableCell>
                  <TableCell>{row.Time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link
            color="primary"
            href="#"
            onClick={preventDefault}
            sx={{ mt: 3 }}
          >
            See more Personels
          </Link>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
