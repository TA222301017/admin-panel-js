import { MoreVertSharp } from "@mui/icons-material";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@mui/material";
import CellLink from "../components/CellLink";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MapCanvas from "../components/MapCanvas";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GET_MAP } from "../store/reducers/mapSlice";
import { getAccessLogStream, getRSSILogStream } from "../store/consumer";

const sleep = (m) => new Promise((r) => setTimeout(r, m));

const crumbs = (mapId) => [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Maps",
    path: "/map",
  },
  {
    name: "Positioning",
    path: `/map/positioning/${mapId}`,
  },
];

const PositionGUI = () => {
  const { mapId } = useParams();

  const {
    value: { map },
    status,
  } = useSelector((state) => state.map);

  const dispatch = useDispatch();

  useEffect(() => {
    let accessStream, rssiStream;

    (async () => {
      rssiStream = await getRSSILogStream({ keyword: "" });
      accessStream = await getAccessLogStream({ keyword: "" });
      accessStream.addEventListener("access", (e) => {
        let data = JSON.parse(e.data);
        let lockEl = document.getElementById(`lock-${data.lock_id}`);

        let blink = async () => {
          lockEl.setAttribute("fill", "rgb(0, 255, 0, 1)");
          await sleep(250);
          lockEl.setAttribute("fill", "rgb(255, 0, 0, 1)");
          await sleep(250);
          lockEl.setAttribute("fill", "rgb(0, 255, 0, 1)");
          await sleep(250);
          lockEl.setAttribute("fill", "rgb(255, 0, 0, 1)");
        };
        blink();
      });
      dispatch(GET_MAP({ mapId }));
    })();

    return () => {
      rssiStream.close();
      accessStream.close();
    };
  }, []);

  return (
    <LoggedInLayout
      title="Map Positioning"
      desc="Lihat keadaan denah secara langsung"
      breadcrumbs={crumbs(mapId)}
    >
      <Grid container spacing={2} style={{ paddingTop: "10px" }}>
        <Grid item xs={8}>
          <MapCanvas
            mapData={map}
            imageURL={import.meta.env.VITE_APP_BASE_URL + map.image_url}
          />
        </Grid>
        <Grid item xs={4} direction="column">
          <Card>
            <CardHeader
              title="Map Menu"
              action={
                <IconButton aria-label="settings">
                  <MoreVertSharp />
                </IconButton>
              }
            />
            <CardContent
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "20px",
                paddingTop: 0,
              }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="normal">
                        <span>Locks</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map?.locks?.map((el, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <span>
                            {`${index + 1}. `}
                            <CellLink href={`/lock/edit/${el.id}`}>
                              {el.name}
                            </CellLink>
                            <span style={{ float: "right" }}>
                              {/* <IconButton
                                size="small"
                                onClick={() =>
                                  handleDeleteLockToMap(map.id, el.id)
                                }
                              >
                                <DeleteSharp />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => setSelectedLockId(el.id)}
                              >
                                <DragIndicatorSharp />
                              </IconButton> */}
                            </span>
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    {!map?.locks?.length ? (
                      <TableRow>
                        <TableCell align="center">
                          <span>No Data</span>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </LoggedInLayout>
  );
};

export default PositionGUI;
