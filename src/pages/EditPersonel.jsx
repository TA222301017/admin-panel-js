import React, { useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import FormEditPersonel from "../components/FormEditPersonel";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_PERSONEL, GET_PERSONEL } from "../store/reducers/personelSlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";
import LoaderCover from "../components/LoaderCover";

const crumbs = (personelId) => [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Personel",
    path: "/personel",
  },
  {
    name: "Edit",
    path: `/personel/edit/${personelId}`,
  },
];

const EditPersonel = () => {
  const {
    value: { personel },
    status,
  } = useSelector((state) => state.personel);

  const {
    value: { keys },
  } = useSelector((state) => state.key);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { personelId } = useParams();

  useEffect(() => {
    dispatch(GET_PERSONEL({ personelId: personelId }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let s = keys.filter((el) => el.name === data.get("key"));

    dispatch(
      EDIT_PERSONEL({
        id: personelId,
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
        navigate("/personel");
      }
    });
  };

  return (
    <LoggedInLayout
      title="Edit Personel"
      desc="Ubah data personel yang terdaftar dalam sistem"
      breadcrumbs={crumbs(personelId)}
    >
      <LoaderCover show={status === "pending"} />

      {status === "fulfilled" && (
        <FormEditPersonel handleSubmit={handleSubmit} personelData={personel} />
      )}
    </LoggedInLayout>
  );
};

export default EditPersonel;
