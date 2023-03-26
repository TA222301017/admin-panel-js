import { Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormAddMap from "../components/FormAddMap";
import MapCanvas from "../components/MapCanvas";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { ADD_MAP } from "../store/reducers/mapSlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Map",
    path: "/map",
  },
  {
    name: "Add",
    path: "/map/add",
  },
];

const AddMap = () => {
  const [mapImageData, setMapImageData] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      ADD_MAP({
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
      title="Add Map"
      desc="Tambahkan denah dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <Grid container spacing={3} style={{ paddingTop: "10px" }}>
        <Grid item xs={8}>
          <MapCanvas imageData={mapImageData} />
        </Grid>
        <Grid item xs={4} direction="column">
          <FormAddMap
            handleImageLoad={handleImageLoad}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </LoggedInLayout>
  );
};

export default AddMap;
