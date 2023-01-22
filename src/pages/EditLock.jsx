import React, { useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import FormEditLock from "../components/FormEditLock";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { EDIT_LOCK, GET_LOCK } from "../store/reducers/lockSlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";
import LoaderCover from "../components/LoaderCover";

const crumbs = (lockId) => [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Lock",
    path: "/lock",
  },
  {
    name: "Edit",
    path: `/lock/edit/${lockId}`,
  },
];

const EditLock = () => {
  const {
    value: { lock },
    status,
    error,
  } = useSelector((state) => state.lock);
  const { lockId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_LOCK({ lockId: lockId }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      EDIT_LOCK({
        lockId: lockId,
        description: data.get("description"),
        location: data.get("location"),
        name: data.get("label"),
      })
    ).then((action) => {
      if (action.payload.error) {
        dispatch(toastError(action.payload.error));
      } else {
        dispatch(toastSuccess("Perubahan berhasil disimpan"));
        navigate("/lock");
      }
    });
  };

  return (
    <LoggedInLayout
      title="Edit Lock"
      desc="Ubah data lock yang ada dalam sistem"
      breadcrumbs={crumbs(lockId)}
    >
      <LoaderCover show={status === "pending"} />

      {lock.name && (
        <FormEditLock lockData={lock} handleSubmit={handleSubmit} />
      )}
    </LoggedInLayout>
  );
};

export default EditLock;
