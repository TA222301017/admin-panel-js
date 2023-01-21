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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_KEYS } from "../store/reducers/keySlice";

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

function handleEditButton(id) {
  // function when button edit clicked
  console.log("button " + id);
}

function handleLocateButton(id) {
  // function when button locate clicked
  console.log("Locate " + id);
}

export default function KeyList() {
  const keys = useSelector((state) => state.key.value.keys);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_KEYS({ page: 1, limit: 20, status: true, keyword: "" }));
  }, []);

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
              {keys.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.key_id}</TableCell>
                  <TableCell>{row.owner}</TableCell>

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
            See more Keys
          </Link>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
