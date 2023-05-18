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
import { extimateDistanceFromRSSI } from "../utils/rssi";

function groupRssiData(data) {
  const groupedData = data.reduce((acc, curr) => {
    const id = curr.personel_id;
    const lockId = curr.lock_id;
    const timestamp = curr.timestamp;

    if (!acc[id]) {
      acc[id] = {};
    }

    if (!acc[id][lockId] || acc[id][lockId].timestamp < timestamp) {
      acc[id][lockId] = curr;
    }

    return acc;
  }, {});

  for (let id in groupedData) {
    groupedData[id] = Object.values(groupedData[id]);
  }

  return groupedData;
}

function findCircleIntersection(x1, y1, r1, x2, y2, r2, x3, y3, r3) {
  let delta_p1 = [
    0, 0, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 0, 0, 0, -1, -1, -1, 0, 0, 0, 1, 1,
    1, -1, -1, -1,
  ];
  let delta_p2 = [
    0, 0, 1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, -1, 1, 0, -1, 1, 0, -1, 1, 0, -1,
    1, 0, -1, 1,
  ];
  let delta_p3 = [
    0, -1, 0, -1, 0, 1, 0, -1, 1, 0, -1, 1, 0, -1, 1, 0, -1, 1, 0, -1, 1, 0, -1,
    1, 0, -1, 1,
  ];
  for (let i = 0; i < delta_p1.length; i++) {
    const d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const d23 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
    const d31 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));

    let R1 = r1 + delta_p1[i];
    let R2 = r2 + delta_p2[i];
    let R3 = r3 + delta_p3[i];

    // Calculate angles between circles using the Law of Cosines
    const a1 = Math.acos(
      (Math.pow(d12, 2) + Math.pow(R1, 2) - Math.pow(R2, 2)) / (2 * d12 * R1)
    );
    const a2 = Math.acos(
      (Math.pow(d23, 2) + Math.pow(R2, 2) - Math.pow(R3, 2)) / (2 * d23 * R2)
    );
    const a3 = Math.acos(
      (Math.pow(d31, 2) + Math.pow(R3, 2) - Math.pow(R1, 2)) / (2 * d31 * R3)
    );

    // Calculate intersection points
    const p1 = [
      x1 + r1 * Math.cos(Math.atan2(y2 - y1, x2 - x1) + a1),
      y1 + r1 * Math.sin(Math.atan2(y2 - y1, x2 - x1) + a1),
    ];
    const p2 = [
      x2 + r2 * Math.cos(Math.atan2(y3 - y2, x3 - x2) + a2),
      y2 + r2 * Math.sin(Math.atan2(y3 - y2, x3 - x2) + a2),
    ];
    const p3 = [
      x3 + r3 * Math.cos(Math.atan2(y1 - y3, x1 - x3) + a3),
      y3 + r3 * Math.sin(Math.atan2(y1 - y3, x1 - x3) + a3),
    ];

    if (p1 && p2 && p3) {
      return [p1, p2, p3];
    }
  }

  return [undefined, undefined, undefined];
}

function findIncenter(x1, y1, x2, y2, x3, y3) {
  // Calculate the length of each side of the triangle
  const a = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
  const b = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
  const c = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  // Calculate the coordinates of the incenter
  const x = (a * x1 + b * x2 + c * x3) / (a + b + c);
  const y = (a * y1 + b * y2 + c * y3) / (a + b + c);

  return [x, y];
}

const MapCanvas = ({
  rssiData = null,
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

          {rssiData && mapData
            ? Object.keys(groupRssiData(rssiData)).map((personelId, index) => {
                try {
                  let personelFootprint = groupRssiData(rssiData)[personelId];
                  if (personelFootprint?.length >= 3) {
                    let { coord_x: x1, coord_y: y1 } = mapData.locks.find(
                      (e) => e.id === personelFootprint[0].lock_id
                    );
                    let { coord_x: x2, coord_y: y2 } = mapData.locks.find(
                      (e) => e.id === personelFootprint[1].lock_id
                    );
                    let { coord_x: x3, coord_y: y3 } = mapData.locks.find(
                      (e) => e.id === personelFootprint[2].lock_id
                    );
                    let r1 =
                      (extimateDistanceFromRSSI(personelFootprint[0].rssi) *
                        svgCanvasRef.current?.getBoundingClientRect().width) /
                      mapData.width;
                    let r2 =
                      (extimateDistanceFromRSSI(personelFootprint[1].rssi) *
                        svgCanvasRef.current?.getBoundingClientRect().width) /
                      mapData.width;
                    let r3 =
                      (extimateDistanceFromRSSI(personelFootprint[2].rssi) *
                        svgCanvasRef.current?.getBoundingClientRect().width) /
                      mapData.width;
                    console.log(r1, r2, r3);
                    let [p1, p2, p3] = findCircleIntersection(
                      x1,
                      y1,
                      r1,
                      x2,
                      y2,
                      r2,
                      x3,
                      y3,
                      r3
                    );
                    let [x, y] = findIncenter(
                      p1[0],
                      p1[1],
                      p2[0],
                      p2[1],
                      p3[0],
                      p3[1]
                    );

                    console.log("HUU", x, y);

                    return (
                      <g>
                        <circle
                          key={index}
                          id={`personel-${personelId}`}
                          cx={`${isNaN(x) ? -100 : x}`}
                          cy={`${isNaN(y) ? -100 : y}`}
                          stroke-width="2"
                          r="12"
                          fill="rgb(0, 0, 0, 1)"
                        />
                        <text
                          x={`${x}`}
                          y={`${y}`}
                          text-anchor="middle"
                          stroke="#ffffff"
                          stroke-width="1px"
                          dy=".3em"
                        >
                          {personelId}
                        </text>
                      </g>
                    );
                  }
                  return null;
                } catch (err) {
                  console.log(err);
                  return null;
                }
              })
            : null}
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
                      r={`${
                        (6 *
                          svgCanvasRef.current?.getBoundingClientRect().width) /
                        mapData.width
                      }`}
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
                    stroke="#ffffff"
                    stroke-width="1px"
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
