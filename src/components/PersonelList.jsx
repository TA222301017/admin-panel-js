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
function createData(ID, Name, IDNumber, Role) {
  return { ID, Name, IDNumber, Role };
}

// hardcode for temporary data
const rows = [
  createData(1, "Taruna", 13219030, "Admin"),
  createData(2, "Elkhan", 13219050, "Admin"),
  createData(3, "Sidartha", 13219033, "Admin"),
  createData(4, "Taruna", 13219030, "Admin"),
  createData(5, "Elkhan", 13219050, "Admin"),
  createData(6, "Sidartha", 13219033, "Admin"),
];

function preventDefault(event) {
  event.preventDefault();
}

function handleEditButton(id) {
  // function when button edit clicked
  console.log("button " + id);
}

function handleLocateButton(id) {
  // function when button locate clicked
  console.log("Locate " + id);
}

function handleStatusButton(id) {
  // function when button status clicked
  console.log("Status " + id);
}

export default function PersonelList() {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>ID Number</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.IDNumber}</TableCell>
                  <TableCell>{row.Role}</TableCell>

                  <TableCell align="center">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => handleEditButton(row.Name)}
                    >
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => handleStatusButton(row.Name)}
                    >
                      Status
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => handleLocateButton(row.Name)}
                    >
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
            See more Personels
          </Link>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
