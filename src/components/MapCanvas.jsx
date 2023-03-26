import {
  RestoreSharp,
  ZoomOutSharp,
  ZoomInSharp,
  DragHandleSharp,
} from "@mui/icons-material";
import { IconButton, ButtonGroup } from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import placeholderImage from "../../map-placeholder.jpg";
import { EDIT_LOCK_TO_MAP } from "../store/reducers/mapSlice";
import { toastSuccess, toastError } from "../store/reducers/toastSlice";

const MapCanvas = ({
  imageURL,
  imageData,
  mapData,
  selectedLockId = -1,
  setSelectedLockId,
}) => {
  const color = useSelector((state) => state.color.value);
  const dispatch = useDispatch();

  const [mode, setMode] = useState("DRAG");

  const [scaling, setScaling] = useState({ x: 1, y: 1 });
  const [translation, setTranslation] = useState({ x: 0, y: 0 });
  const [temp, setTemp] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [rangeVisible, setRangeVisible] = useState(false);

  const svgCanvasRef = useRef(null);

  const handleMouseDown = (e) => {
    switch (mode) {
      case "DRAG":
        setCoord({
          x: e.pageX,
          y: e.pageY,
        });
        setTemp(translation);
        setDragging(true);
        break;

      case "ZOOMIN":
        setScaling({ x: scaling.x * 1.5, y: scaling.y * 1.5 });
        break;

      case "ZOOMOUT":
        setScaling({ x: scaling.x / 1.5, y: scaling.y / 1.5 });
        break;

      default:
        break;
    }
  };

  const handleMouseMove = (e) => {
    if (dragging && mode === "DRAG") {
      setTranslation({
        x: temp.x + e.pageX - coord.x,
        y: temp.y + e.pageY - coord.y,
      });
    }
    let clientRect = e.currentTarget.getBoundingClientRect();
    let localX = e.clientX - clientRect.x;
    let localY = e.clientY - clientRect.y;
    setOffset({ x: localX, y: localY });
  };

  const handleMouseUp = (e) => {
    if (mode === "DRAG") {
      setCoord({ x: 0, y: 0 });
      setDragging(false);
    }
  };

  const handleLockDrag = (e) => {
    let clientRect = e.currentTarget.getBoundingClientRect();
    let localX = e.clientX - clientRect.x;
    let localY = e.clientY - clientRect.y;
    setOffset({ x: localX, y: localY });
  };

  const handleLockClick = (e) => {
    if (Number(e.currentTarget.getAttribute("lockId")) !== selectedLockId) {
      setSelectedLockId(Number(e.currentTarget.getAttribute("lockId")));
    } else {
      dispatch(
        EDIT_LOCK_TO_MAP({
          mapId: mapData.id,
          lockId: selectedLockId,
          coordX: Number(offset.x - translation.x) / scaling.x,
          coordY: Number(offset.y - translation.y) / scaling.y,
        })
      ).then((res) => {
        if (res.payload.error) {
          dispatch(toastError("Gagal menyimpan perubahan"));
        } else {
          dispatch(toastSuccess("Perubahan berhasil disimpan"));
        }
        setSelectedLockId(-1);
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        style={{
          cursor: mode === "DRAG" ? "grab" : "cursor",
          position: "absolute",
          top: 0,
          right: 0,
        }}
        ref={svgCanvasRef}
        draggable
        width="100%"
        height={800}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <g
          transform={`translate(${translation.x},${translation.y}) scale(${scaling.x}, ${scaling.y})`}
        >
          <image
            width="100%"
            href={imageData ? imageData : null}
            xlinkHref={imageURL ? imageURL : placeholderImage}
            onMouseMove={handleLockDrag}
          />
          {mapData?.locks
            ? mapData.locks.map((el, index) => (
                <g lockId={`${el.id}`} onClick={handleLockClick} key={index}>
                  <circle
                    id={`lock-${el.id}`}
                    cx={`${
                      el.id === selectedLockId
                        ? (offset.x - translation.x) / scaling.x
                        : el.coord_x
                    }`}
                    cy={`${
                      el.id === selectedLockId
                        ? (offset.y - translation.y) / scaling.y
                        : el.coord_y
                    }`}
                    stroke-width="2"
                    r="12"
                    fill="rgb(255, 0, 0, 1)"
                  />
                  {rangeVisible && (
                    <circle
                      cx={`${
                        el.id === selectedLockId
                          ? (offset.x - translation.x) / scaling.x
                          : el.coord_x
                      }`}
                      cy={`${
                        el.id === selectedLockId
                          ? (offset.y - translation.y) / scaling.y
                          : el.coord_y
                      }`}
                      stroke-width="2"
                      r={`${(3 * mapData.image_width) / mapData.width}`}
                      fill="rgb(0, 0, 128, 0.15)"
                    />
                  )}
                  <text
                    x={`${
                      el.id === selectedLockId
                        ? (offset.x - translation.x) / scaling.x
                        : el.coord_x
                    }`}
                    y={`${
                      el.id === selectedLockId
                        ? (offset.y - translation.y) / scaling.y
                        : el.coord_y
                    }`}
                    text-anchor="middle"
                    stroke="#ff"
                    stroke-width="2px"
                    dy=".3em"
                  >
                    {index + 1}
                  </text>
                </g>
              ))
            : null}
        </g>
      </svg>
      <ButtonGroup
        variant="contained"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: color === "dark" ? "#121212" : "#fff",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        }}
      >
        <IconButton
          type="button"
          onClick={() => setRangeVisible(!rangeVisible)}
        >
          <DragHandleSharp />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => {
            setScaling({ x: scaling.x * 2, y: scaling.y * 2 });
          }}
        >
          <ZoomInSharp />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => {
            setScaling({ x: scaling.x / 2, y: scaling.y / 2 });
          }}
        >
          <ZoomOutSharp />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => {
            setMode("DRAG");
            setTranslation({ x: 0, y: 0 });
            setScaling({ x: 1, y: 1 });
          }}
        >
          <RestoreSharp />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default MapCanvas;
