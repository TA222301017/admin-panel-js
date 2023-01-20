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
function createData(ID, Name, KeyID, Owner) {
  return { ID, Name, KeyID, Owner };
}

// hardcode for temporary data
const rows = [
  createData(1, "Key 01", 13219030, "Taruna"),
  createData(2, "Key 02", 13219050, "Elkhan"),
  createData(3, "Key 03", 13219033, "Sidartha"),
  createData(4, "Key 04", 13219030, "Taruna"),
  createData(5, "Key 05", 13219050, "Elkhan"),
  createData(6, "Key 06", 13219033, "Sidartha"),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function KeyList() {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Key ID</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.KeyID}</TableCell>
                  <TableCell>{row.Owner}</TableCell>

                  <TableCell align="center">
                    <Button type="submit" variant="contained">
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button type="submit" variant="contained">
                      Locate
                    </Button>
                  </TableCell>
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
            See more Keys
          </Link>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
