import http from "../utils/httpClient";

const handleError = (err) => {
  if (err.response) {
    return err.response.data;
  } else {
    console.log(err);
    return {};
  }
};

export const login = async ({ username, password }) => {
  try {
    let res = await http.post(`in`, { username, password });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getAccessRule = async ({ personelId }) => {
  try {
    let res = await http.get(`/access/${personelId}`);
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const addAccessRule = async ({
  lockId,
  personelId,
  startsAt,
  endsAt,
}) => {
  try {
    let res = await http.post(`/access`, {
      lock_id: lockId,
      personelId: personelId,
      starts_at: startsAt,
      ends_at: endsAt,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const editAccessRule = async ({
  lockId,
  personelId,
  startsAt,
  endsAt,
  accessRuleId,
}) => {
  try {
    let res = await http.patch(`/access/${accessRuleId}`, {
      lock_id: lockId,
      personelId: personelId,
      starts_at: startsAt,
      ends_at: endsAt,
    });
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const deleteAccessRule = async ({ accessRuleId }) => {
  try {
    let res = await http.delete(`/access/${accessRuleId}`);
    return res.data;
  } catch (error) {
    return handleError(err);
  }
};

export const getAccessLog = async ({
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
    return res.data;
  } catch (error) {
    return handleError(err);
  }
};

export const getHealthcheckLog = async () => {};

export const getRSSILog = async () => {};

export const getLocks = async () => {};

export const getLock = async () => {};

export const editLock = async () => {};

export const getKeys = async () => {};

export const getKey = async () => {};

export const addKey = async () => {};

export const editKey = async () => {};

export const checkLocks = async () => {};

export const checkLock = async () => {};

export const getPersonels = async () => {};

export const getPersonel = async () => {};

export const addPersonel = async () => {};

export const editPersonel = async () => {};

export const dashboard = async () => {};
