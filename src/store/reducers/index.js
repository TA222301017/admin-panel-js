export const stateStatus = Object.freeze({
  idle: "idle",
  pending: "pending",
  fulfilled: "fulfilled",
  failed: "failed",
});

export const baseState = {
  value: {},
  status: stateStatus.idle,
  error: "",
};

export const baseReducers = {
  clear: (state) => {
    state = baseState;
  },
  idlelize: (state) => {
    state.status = "idle";
  },
};
