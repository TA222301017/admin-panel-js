import React, { useState, useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { DownloadSharp, PlayArrowSharp, StopSharp } from "@mui/icons-material";
import DataTableFilterForm from "../components/DataTableFilterForm";
import DataTable from "../components/DataTable";
import CellLink from "../components/CellLink";
import { addAccessLog, GET_ACCESS_LOG } from "../store/reducers/logSlice";
import * as XLSX from "xlsx";
import { getAccessLogRequest } from "../store/consumer";
import { timeToPrettyTimeString } from "../utils/formatTime";
import { FormLabel, IconButton, Switch, Toolbar } from "@mui/material";
import { useRef } from "react";
import { toastInfo } from "../store/reducers/toastSlice";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Access Logs",
    path: "/access-log",
  },
];

const AccessLogs = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLive, setIsLive] = useState(false);
  const [filter, setFilter] = useState({
    keyword: "",
    status: "any",
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 0)),
  });

  const {
    value: { access, pagination },
    status,
    error,
  } = useSelector((state) => state.log);

  const streamRef = useRef(null);

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
      GET_ACCESS_LOG({
        page: pageNum + 1,
        limit: limit,
        location: filter.keyword,
        personel: filter.keyword,
        status: filter.status,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setPage(1);
    dispatch(
      GET_ACCESS_LOG({
        page: 1,
        limit: pageSize,
        location: filter.keyword,
        personel: filter.keyword,
        status: filter.status,
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
      status: data.get("status"),
      startDate: new Date(data.get("startdate")),
      endDate: new Date(data.get("enddate")),
    });

    dispatch(
      GET_ACCESS_LOG({
        page: 1,
        limit: limit,
        location: data.get("keyword"),
        personel: data.get("keyword"),
        status: data.get("status"),
        startDate: new Date(data.get("startdate")),
        endDate: new Date(data.get("enddate")),
      })
    );
  };

  const handleExport = () => {
    getAccessLogRequest({
      page: 1,
      limit: -1,
      startDate: filter.startDate,
      endDate: filter.endDate,
      location: filter.keyword,
      personel: filter.keyword,
      status: filter.status,
    }).then(({ data }) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, makeFilename("access_log"));
      dispatch(toastSuccess("Berhasil mengunduh"));
    });
  };

  const handleGoLive = () => {
    let stream = new EventSource(
      import.meta.env.VITE_API_BASE_URL + "/log/access/stream"
    );

    streamRef.current = stream;

    stream.addEventListener("access", (e) => {
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
      GET_ACCESS_LOG({
        page: pagination.page,
        limit: pagination.limit,
        startDate: filter.startDate,
        endDate: filter.endDate,
        personel: filter.keyword,
        location: filter.keyword,
      })
    );

    return () => {
      if (streamRef.current) {
        streamRef.current.close();
      }
    };
  }, []);

  return (
    <LoggedInLayout
      title="Access Logs"
      desc="Tinjau riwayat akses yang tercatat dalam sistem"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm withDate withoutStatus handleSearch={handleSearch}>
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
        rows={access.map((el, i) => ({
          ...el,
          index: (page - 1) * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default AccessLogs;
