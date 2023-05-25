import {
  AddSharp,
  DeleteSharp,
  DragIndicatorSharp,
  MoreVertSharp,
} from "@mui/icons-material";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Box,
  InputAdornment,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { DELETE_LOCK_TO_MAP } from "../store/reducers/mapSlice";
import { toastSuccess, toastError } from "../store/reducers/toastSlice";
import CardLock from "./CardLock";
import CellLink from "./CellLink";
import TabPanel from "./TabPanel";

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const FormAddMap = ({
  mapData,
  handleSubmit,
  handleImageLoad,
  selectedLockId,
  setSelectedLockId,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const imageFieldRef = useRef(null);
  const dispatch = useDispatch();

  const handlePickImage = (e) => {
    imageFieldRef.current.click();
  };

  const handleImageSelection = (e) => {
    handleImageLoad(e);
  };

  const handleTabChange = (e, tabIndex) => {
    setTabIndex(tabIndex);
  };

  const handleDeleteLockToMap = (mapId, lockId) => {
    dispatch(DELETE_LOCK_TO_MAP({ mapId, lockId })).then((res) => {
      if (res.payload.error) {
        dispatch(toastError("Gagal menghapus data"));
      } else {
        dispatch(toastSuccess("Data berhasil dihapus"));
      }
    });
  };

  return (
    <>
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
          <Tab label="Data Denah" {...a11yProps(0)} />
          <Tab label="Data Lock" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <form onSubmit={handleSubmit}>
            <CardContent
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "20px",
                paddingTop: 0,
              }}
            >
              <TextField
                size="small"
                label="Nama Denah"
                name="name"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Lantai X"
                inputProps={{ defaultValue: mapData?.name }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    label="Lebar"
                    name="width"
                    type="number"
                    placeholder="3.00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      defaultValue: mapData?.width,
                      min: "0",
                      step: "0.01",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    label="Tinggi"
                    type="number"
                    name="height"
                    placeholder="4.00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      defaultValue: mapData?.height,
                      step: "0.01",
                      min: "0",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <input
                name="image"
                type="file"
                accept=".gif,.jpg,.jpeg,.png"
                ref={imageFieldRef}
                style={{ display: "none" }}
                onChange={handleImageSelection}
              />
              <Button
                variant="outlined"
                color="inherit"
                type="button"
                onClick={handlePickImage}
              >
                Pilih Gambar
              </Button>
              <Button variant="outlined" color="inherit" type="submit">
                Simpan
              </Button>
            </CardContent>
          </form>
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
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="normal">
                      <span>Lock</span>
                      <span style={{ float: "right" }}>
                        <IconButton
                          size="small"
                          onClick={() => setModalOpen(true)}
                        >
                          <AddSharp />
                        </IconButton>
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mapData?.locks?.map((el, index) => (
                    <TableRow key={index} selected={el.id === selectedLockId}>
                      <TableCell>
                        <span>
                          {`${index + 1}. `}
                          <CellLink href={`/lock/edit/${el.id}`}>
                            {el.name}
                          </CellLink>
                          <span style={{ float: "right" }}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteLockToMap(mapData.id, el.id)
                              }
                            >
                              <DeleteSharp />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => setSelectedLockId(el.id)}
                            >
                              <DragIndicatorSharp />
                            </IconButton>
                          </span>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!mapData?.locks?.length ? (
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
          <CardLock
            setModalOpen={setModalOpen}
            setSelectedLockId={setSelectedLockId}
          />
        </Box>
      </Modal>
    </>
  );
};

export default FormAddMap;
