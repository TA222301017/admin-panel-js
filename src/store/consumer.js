import http from "../utils/httpClient";
import { timeToAPIDateString } from "../utils/formatTime";
import store from "./store";
import { toastError } from "./reducers/toastSlice";

const apiCallError = {
  data: {},
  error: "failed to call api",
  msg: "failed to call api",
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    last: 1,
  },
};

export const handleError = (err) => {
  if (err.response.data?.msg) {
    console.log(err);
    store.dispatch(toastError(err.response.data.msg));
    throw new Error(err);
  } else {
    console.log(err);
    store.dispatch(toastError(err.message));
    throw new Error(err);
  }
};

export const checkLock = async ({ lockId }) => {
  try {
    let res = await http.get(`/device/lock/check/${lockId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const loginRequest = async ({ username, password }) => {
  try {
    let res = await http.post(`/login`, { username, password });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getRolesRequest = async () => {
  try {
    let res = await http.get(`/personel/role`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getAllAccessRuleRequest = async ({
  page,
  limit,
  startDate,
  endDate,
  keyword,
}) => {
  try {
    let res = await http.get(`/access`, {
      params: {
        page: page,
        limit: limit,
        startdate: timeToAPIDateString(startDate),
        enddate: timeToAPIDateString(endDate),
        keyword: keyword,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getAccessRuleRequest = async ({ mapId, page, limit }) => {
  try {
    let res = await http.get(`/access/${mapId}`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const addAccessRuleRequest = async ({
  lockId,
  mapId,
  startsAt,
  endsAt,
}) => {
  try {
    let res = await http.post(`/access`, {
      lock_id: lockId,
      personel_id: mapId,
      starts_at: startsAt,
      ends_at: endsAt,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const editAccessRuleRequest = async ({
  lockId,
  mapId,
  startsAt,
  endsAt,
  accessRuleId,
}) => {
  try {
    let res = await http.patch(`/access/${accessRuleId}`, {
      lock_id: lockId,
      personel_id: mapId,
      starts_at: startsAt,
      ends_at: endsAt,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const deleteAccessRuleRequest = async ({ accessRuleId }) => {
  try {
    let res = await http.delete(`/access/${accessRuleId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getAccessLogRequest = async ({
  page,
  limit,
  startDate,
  endDate,
  personel,
  location,
}) => {
  try {
    let res = await http.get(`/log/access`, {
      params: {
        page: page,
        limit: limit,
        startdate: timeToAPIDateString(startDate),
        enddate: timeToAPIDateString(endDate),
        personel: personel,
        location: location,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getHealthcheckLogRequest = async ({
  page,
  limit,
  startDate,
  endDate,
  location,
  status,
}) => {
  try {
    let res = await http.get(`/log/healthcheck`, {
      params: {
        page: page,
        limit: limit,
        startdate: timeToAPIDateString(startDate),
        enddate: timeToAPIDateString(endDate),
        location: location,
        status: status,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getRSSILogRequest = async ({
  page,
  limit,
  startDate,
  endDate,
  keyword,
}) => {
  try {
    let res = await http.get(`/log/rssi`, {
      params: {
        page: page,
        limit: limit,
        startdate: timeToAPIDateString(startDate),
        enddate: timeToAPIDateString(endDate),
        keyword: keyword,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getLocksRequest = async ({ page, limit, status, keyword }) => {
  try {
    let res = await http.get(`/device/lock`, {
      params: {
        page: page,
        limit: limit,
        status: status,
        keyword: keyword,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getLockRequest = async ({ lockId }) => {
  try {
    let res = await http.get(`/device/lock/${lockId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const editLockRequest = async ({
  lockId,
  name,
  description,
  location,
}) => {
  try {
    let res = await http.patch(`/device/lock/${lockId}`, {
      name: name,
      description: description,
      location: location,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getKeysRequest = async ({ page, limit, status, keyword }) => {
  try {
    let res = await http.get(`/device/key`, {
      params: {
        page: page,
        limit: limit,
        status: status,
        keyword: keyword,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getKeyRequest = async ({ keyId }) => {
  try {
    let res = await http.get(`/device/key/${keyId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const addKeyRequest = async ({ keyId, name, status, description }) => {
  try {
    let res = await http.post(`/device/key`, {
      key_id: keyId,
      name: name,
      status: status,
      description: description,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const editKeyRequest = async ({
  id,
  keyId,
  name,
  status,
  description,
}) => {
  try {
    let res = await http.patch(`/device/key/${id}`, {
      key_id: keyId,
      name: name,
      status: status,
      description: description,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const checkLocksRequest = async () => {
  try {
    let res = await http.get(`/device/lock/check`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const checkLockRequest = async ({ lockId }) => {
  try {
    let res = await http.get(`/device/lock/check/${lockId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getPersonelsRequest = async ({ page, limit, status, keyword }) => {
  try {
    let res = await http.get(`/personel`, {
      params: {
        page: page,
        limit: limit,
        status: status,
        keyword: keyword,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getPersonelRequest = async ({ personelId }) => {
  try {
    let res = await http.get(`/personel/${personelId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const addPersonelRequest = async ({
  name,
  personelId,
  roleId,
  keyId,
  status,
  description,
}) => {
  try {
    let res = await http.post(`/personel`, {
      name: name,
      personel_id: personelId,
      role_id: roleId,
      key_id: keyId,
      status: status,
      description: description,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const editPersonelRequest = async ({
  id,
  name,
  personelId,
  roleId,
  keyId,
  status,
  description,
}) => {
  try {
    let res = await http.patch(`/personel/${id}`, {
      name: name,
      personel_id: personelId,
      role_id: roleId,
      key_id: keyId,
      status: status,
      description: description,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getMapsRequest = async ({ page, limit, keyword }) => {
  try {
    let res = await http.get(`/plan`, {
      params: {
        page: page,
        limit: limit,
        keyword: keyword,
      },
    });
    if (res.data.data === null) res.data.data = [];
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getMapRequest = async ({ mapId }) => {
  try {
    let res = await http.get(`/plan/${mapId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const addMapRequest = async ({ name, width, height, imageBase64 }) => {
  try {
    let res = await http.post(`/plan`, {
      name,
      width,
      height,
      image: imageBase64,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const editMapRequest = async ({
  id,
  name,
  width,
  height,
  imageBase64,
}) => {
  try {
    let res = await http.patch(`/plan/${id}`, {
      name,
      width,
      height,
      image: imageBase64,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const deleteMapRequest = async ({ mapId }) => {
  try {
    let res = await http.delete(`/plan/${mapId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const addLockToMap = async ({ mapId, lockId }) => {
  try {
    let res = await http.post(`/plan/${mapId}/lock`, {
      lock_id: lockId,
      coord_x: 0,
      coord_y: 0,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const editLockToMap = async ({ mapId, lockId, coordX, coordY }) => {
  try {
    let res = await http.patch(`/plan/${mapId}/lock/${lockId}`, {
      lock_id: lockId,
      coord_x: coordX,
      coord_y: coordY,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const deleteLockToMap = async ({ mapId, lockId }) => {
  try {
    let res = await http.delete(`/plan/${mapId}/lock/${lockId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const dashboardRequest = async () => {
  try {
    let res = await http.get(`/dashboard`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};
