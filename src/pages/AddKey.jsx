import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FormEditKey from "../components/FormEditKey";
import LoaderCover from "../components/LoaderCover";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { ADD_KEY } from "../store/reducers/keySlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Key",
    path: "/key",
  },
  {
    name: "Add",
    path: "/key/add",
  },
];

const AddKey = () => {
  const {
    value: { key },
    status,
    error,
  } = useSelector((state) => state.key);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      ADD_KEY({
        keyId: data.get("key_id"),
        aesKey: data.get("aes_key"),
        name: data.get("label"),
        status: data.get("status") === "true",
        description: data.get("description"),
      })
    ).then((action) => {
      if (action.payload.error) {
        dispatch(toastError(action.payload.error));
      } else {
        dispatch(toastSuccess("Perubahan berhasil disimpan"));
        navigate("/key");
      }
    });
  };

  return (
    <LoggedInLayout
      title="Add Key"
      desc="Daftarkan kunci baru ke dalam sistem"
      breadcrumbs={crumbs}
    >
      <LoaderCover show={status === "pending"} />

      <FormEditKey handleSubmit={handleSubmit} />
    </LoggedInLayout>
  );
};

export default AddKey;
