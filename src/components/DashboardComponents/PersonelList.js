import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import Title from "./Title";

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

export default function PersonelList() {
  return (
    <React.Fragment>
      <Title>Personel List</Title>
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
                <Button type="submit" variant="contained">
                  Edit
                </Button>
              </TableCell>

              <TableCell align="center">
                <Button type="submit" variant="contained">
                  Status
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
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Personels
      </Link>
    </React.Fragment>
  );
}