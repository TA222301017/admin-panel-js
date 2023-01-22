import React, { useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import FormEditKey from "../components/FormEditKey";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { EDIT_KEY, GET_KEY } from "../store/reducers/keySlice";
import LoaderCover from "../components/LoaderCover";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";

const crumbs = (keyId) => [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Key",
    path: "/key",
  },
  {
    name: "Edit",
    path: `/key/edit/${keyId}`,
  },
];

const EditKey = () => {
  const {
    value: { key },
    status,
    error,
  } = useSelector((state) => state.key);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { keyId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      EDIT_KEY({
        id: keyId,
        keyId: data.get("key_id"),
        name: data.get("label"),
        status: Boolean(data.get("status")),
        description: data.get("description"),
      })
    ).then(() => {
      if (error) {
        dispatch(toastError(error));
      } else {
        dispatch(toastSuccess("Perubahan berhasil disimpan"));
        navigate("/key");
      }
    });
  };

  useEffect(() => {
    dispatch(GET_KEY({ keyId: keyId }));
  }, []);

  return (
    <LoggedInLayout
      title="Edit Key"
      desc="Ubah data kunci yang ada dalam sistem"
      breadcrumbs={crumbs(keyId)}
    >
      <LoaderCover show={status === "pending"} />

      <FormEditKey keyData={key} handleSubmit={handleSubmit} />
    </LoggedInLayout>
  );
};

export default EditKey;
