import { MoreVertSharp } from "@mui/icons-material";
import {
  Grid,
  Modal,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Box,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  Tabs,
  Tab,
} from "@mui/material";
import CellLink from "../components/CellLink";
import TabPanel from "../components/TabPanel";
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

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const PositionGUI = () => {
  const [rssiData, setRssiData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [personels, setPersonels] = useState([{}]);
  const [tabIndex, setTabIndex] = useState(0);
  const { mapId } = useParams();

  const {
    value: { map },
    status,
  } = useSelector((state) => state.map);

  const dispatch = useDispatch();

  const handleTabChange = (e, tabIndex) => {
    setTabIndex(tabIndex);
  };

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

      rssiStream.addEventListener("rssi", (e) => {
        let data = JSON.parse(e.data);
        data.timestamp = new Date(data.timestamp).getTime();
        console.log(data.timestamp);
        setRssiData((p) => {
          return [data, ...p];
        });
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
            rssiData={rssiData}
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
            <Tabs
              variant="fullWidth"
              color="inherit"
              textColor="inherit"
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              style={{ padding: "20px 0" }}
            >
              <Tab label="Ket. Lock" {...a11yProps(0)} />
              <Tab label="Ket. Personel" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
              <CardContent
                style={{
                  display: "flex",
                  flexFlow: "column wrap",
                  gap: "20px",
                  paddingTop: 0,
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="normal">
                          <span>Locks</span>
                        </TableCell>
                        <TableCell padding="normal">
                          <span>Personel</span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {map?.locks?.map((el, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {`${index + 1}. `}
                            <CellLink href={`/lock/edit/${el.id}`}>
                              {el.name}
                            </CellLink>
                          </TableCell>
                          <TableCell
                            href={`#`}
                            onClick={() => {
                              setModalOpen(true);
                              setPersonels(
                                Array.from(
                                  new Set(
                                    rssiData
                                      .filter((e) => e.lock_id === el.id)
                                      .map(
                                        (e) => `${e.personel_id},${e.personel}`
                                      )
                                  )
                                )
                              );
                            }}
                          >
                            <CellLink href={"#"}>
                              {
                                new Set(
                                  rssiData
                                    .filter((e) => e.lock_id === el.id)
                                    .map((e) => e.personel_id)
                                ).size
                              }{" "}
                              orang
                            </CellLink>
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
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <CardContent
                style={{
                  display: "flex",
                  flexFlow: "column wrap",
                  gap: "20px",
                  paddingTop: 0,
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="normal">
                          <span>Personels</span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.from(
                        new Set(
                          rssiData.map((e) => `${e.personel_id},${e.personel}`)
                        )
                      ).map((el, index) =>
                        el ? (
                          <TableRow key={index}>
                            <TableCell>
                              {`${index + 1}. `}
                              <CellLink
                                href={`/personel/edit/${el.split(",")[0]}`}
                              >
                                {el.split(",")[1]}
                              </CellLink>
                            </TableCell>
                          </TableRow>
                        ) : null
                      )}
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
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Card variant="outlined">
            <CardHeader title="Personel-personel di sekitar lock" />
            <CardContent>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                  <TableBody>
                    {personels.map((el, index) =>
                      typeof el === "string" ? (
                        <TableRow key={index}>
                          <TableCell>
                            {`${index + 1}. `}
                            <CellLink
                              href={`/personel/edit/${el.split(",")[0]}`}
                            >
                              {el.split(",")[1]}
                            </CellLink>
                          </TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </LoggedInLayout>
  );
};

export default PositionGUI;
