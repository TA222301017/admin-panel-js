import React, { useState, useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import CellLink from "../components/CellLink";
import Button from "@mui/material/Button";
import DataTableFilterForm from "../components/DataTableFilterForm";
import { addRSSILog, GET_RSSI_LOG } from "../store/reducers/logSlice";
import * as XLSX from "xlsx";
import { getRSSILogRequest, getRSSILogStream } from "../store/consumer";
import { DownloadSharp, PlayArrowSharp, StopSharp } from "@mui/icons-material";
import { timeToPrettyTimeString } from "../utils/formatTime";
import { useRef } from "react";
import { toastSuccess, toastInfo } from "../store/reducers/toastSlice";
import useQueryParams from "../hooks/useQueryParams";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Position Logs",
    path: "/position-log",
  },
];

const RSSILogs = () => {
  const query = useQueryParams();

  const [isLive, setIsLive] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({
    keyword: query.get("keyword"),
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 0)),
  });

  const streamRef = useRef(null);

  const {
    value: { rssi, pagination },
    status,
    error,
  } = useSelector((state) => state.log);

  const dispatch = useDispatch();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    {
      field: "personel",
      headerName: "Personel",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/personel/edit/${params.row.personel_id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    {
      field: "lock",
      headerName: "Lock",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/lock/edit/${params.row.lock_id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    {
      field: "key",
      headerName: "Key",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/key/edit/${params.row.key_id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    { field: "location", headerName: "Location", flex: 0.5 },
    {
      field: "rssi",
      headerName: "Jarak (approx.)",
      flex: 0.5,
      valueFormatter: (params) => {
        // 10^((Measured Power - Instant RSSI)/10*N)
        let dist = Math.pow(10, (params.value + 10) / (10 * 2.4));
        dist = Math.round(dist * 1000);
        dist = dist / 1000;
        return `${dist} m`;
      },
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
      valueFormatter: (params) => {
        return timeToPrettyTimeString(new Date(params.value));
      },
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum + 1);
    dispatch(
      GET_RSSI_LOG({
        page: pageNum + 1,
        limit: limit,
        keyword: filter.keyword,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setPage(1);
    dispatch(
      GET_RSSI_LOG({
        page: 1,
        limit: pageSize,
        keyword: filter.keyword,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);

    setPage(1);
    setFilter({
      keyword: data.get("keyword"),
      startDate: new Date(data.get("startdate")),
      endDate: new Date(data.get("enddate")),
    });

    dispatch(
      GET_RSSI_LOG({
        page: 1,
        limit: limit,
        keyword: data.get("keyword"),
        startDate: new Date(data.get("startdate")),
        endDate: new Date(data.get("enddate")),
      })
    );
  };

  const handleExport = () => {
    getRSSILogRequest({
      page: 1,
      limit: -1,
      startDate: filter.startDate,
      endDate: filter.endDate,
      keyword: filter.keyword,
    }).then(({ data }) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, makeFilename("rssi_log"));
      dispatch(toastSuccess("Berhasil mengunduh"));
    });
  };

  const handleGoLive = async () => {
    let stream = await getRSSILogStream({ keyword: filter.keyword });

    streamRef.current = stream;

    stream.addEventListener("rssi", (e) => {
      dispatch(addAccessLog(JSON.parse(e.data)));
    });

    dispatch(toastInfo("Menampilkan data live..."));
  };

  const handleStopLive = () => {
    streamRef.current.close();

    dispatch(toastInfo("Menampilkan data historis"));
  };

  useEffect(() => {
    dispatch(
      GET_RSSI_LOG({
        page: pagination.page,
        limit: pagination.limit,
        startDate: filter.startDate,
        endDate: filter.endDate,
        keyword: filter.keyword,
      })
    );

    let stream;

    (async () => {
      stream = await getRSSILogStream({ keyword: "" });
      stream.addEventListener("rssi", (e) => {
        let rssiEvent = JSON.parse(e.data);
        dispatch(addRSSILog(rssiEvent));
      });
    })();

    return () => {
      stream.close();
    };
  }, []);

  return (
    <LoggedInLayout
      title="Position Logs"
      desc="Tinjau riwayat posisi personel-personel dalam sistem"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm
        withDate
        withoutStatus
        handleSearch={handleSearch}
        keywordDefault={query.get("keyword")}
      >
        <Button
          type="button"
          size="medium"
          variant="outlined"
          color="inherit"
          onClick={handleExport}
          startIcon={<DownloadSharp />}
        >
          Export
        </Button>

        <Button
          type="button"
          size="medium"
          variant="outlined"
          color="inherit"
          onClick={() => {
            setIsLive(!isLive);
            if (isLive) {
              handleStopLive();
            } else {
              handleGoLive();
            }
          }}
          startIcon={isLive ? <StopSharp /> : <PlayArrowSharp />}
        >
          {isLive ? "Stop" : "Live"}
        </Button>
      </DataTableFilterForm>
      <DataTable
        page={page - 1}
        limit={limit}
        total={pagination.total}
        loading={status === "pending"}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        columns={columnDef}
        rows={rssi.map((el, i) => ({
          ...el,
          index: (page - 1) * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default RSSILogs;
