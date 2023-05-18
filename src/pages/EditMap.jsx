import { Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FormAddMap from "../components/FormAddMap";
import MapCanvas from "../components/MapCanvas";
import LoaderCover from "../components/LoaderCover";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { EDIT_MAP, GET_MAP } from "../store/reducers/mapSlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";

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
    name: "Edit",
    path: `/map/edit/${mapId}`,
  },
];

const EditMap = () => {
  const [mapImageData, setMapImageData] = useState("");
  const [selectedLockId, setSelectedLockId] = useState(-1);

  const {
    value: { map },
    status,
    error,
  } = useSelector((state) => state.map);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mapId } = useParams();

  useEffect(() => {
    dispatch(GET_MAP({ mapId: mapId }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      EDIT_MAP({
        id: mapId,
        name: String(data.get("name")),
        width: Number(data.get("width")),
        height: Number(data.get("height")),
        imageBase64: mapImageData,
      })
    ).then((action) => {
      if (action.payload.error) {
        dispatch(toastError(action.payload.error));
      } else {
        dispatch(toastSuccess("Perubahan berhasil disimpan"));
        navigate("/map");
      }
    });
  };

  const handleImageLoad = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    if (file.size > 1024 * 1024) {
      dispatch(toastError("file too large"));
      return;
    }

    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result.split(",").length < 2) {
        dispatch(toastError("error reading file"));
        return;
      }

      setMapImageData(reader.result);
    };
  };

  return (
    <LoggedInLayout
      title="Edit Denah"
      desc="Ubah data denah dalam sistem Anda"
      breadcrumbs={crumbs(mapId)}
    >
      <LoaderCover show={status === "pending"} />

      {status !== "pending" && (
        <>
          <Grid container spacing={2} style={{ paddingTop: "10px" }}>
            <Grid item xs={8}>
              <MapCanvas
                mapData={map}
                imageURL={import.meta.env.VITE_APP_BASE_URL + map.image_url}
                imageData={mapImageData}
                selectedLockId={selectedLockId}
                setSelectedLockId={setSelectedLockId}
              />
            </Grid>
            <Grid item xs={4} direction="column">
              <FormAddMap
                mapData={map}
                handleImageLoad={handleImageLoad}
                handleSubmit={handleSubmit}
                selectedLockId={selectedLockId}
                setSelectedLockId={setSelectedLockId}
              />
            </Grid>
          </Grid>
        </>
      )}
    </LoggedInLayout>
  );
};

export default EditMap;
