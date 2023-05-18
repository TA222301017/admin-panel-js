import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FormEditPersonel from "../components/FormEditPersonel";
import LoaderCover from "../components/LoaderCover";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { ADD_PERSONEL } from "../store/reducers/personelSlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Personel",
    path: "/personel",
  },
  {
    name: "Add",
    path: "/personel/add",
  },
];

const AddPersonel = () => {
  const { status } = useSelector((state) => state.personel);
  const {
    value: { keys },
  } = useSelector((state) => state.key);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let s = keys.filter((el) => el.name === data.get("key"));
    if (!s.length) {
      return;
    }
    dispatch(
      ADD_PERSONEL({
        name: data.get("name"),
        personelId: data.get("personel_id"),
        roleId: Number(data.get("role_id")),
        keyId: !s.length ? 0 : s[0].id,
        status: data.get("status") === "true",
        description: data.get("description"),
      })
    ).then((res) => {
      if (res.payload.error) {
        dispatch(toastError(res.payload.error));
      } else {
        dispatch(toastSuccess("Perubahan berhasil disimpan"));
        navigate(`/personel/edit/${res.payload.data.id}`);
      }
    });
  };

  return (
    <LoggedInLayout
      title="Daftar Personel"
      desc="Daftarkan personel baru ke dalam sistem"
      breadcrumbs={crumbs}
    >
      <LoaderCover show={status === "pending"} />

      <FormEditPersonel handleSubmit={handleSubmit} />
    </LoggedInLayout>
  );
};

export default AddPersonel;
