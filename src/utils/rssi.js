export const extimateDistanceFromRSSI = (rssi) => {
  // 10^((Measured Power - Instant RSSI)/10*N)
  let N = 2.4;
  let rssiAt1m = -59;
  let dist = Math.pow(10, (rssiAt1m - rssi) / (10 * N));
  dist = Math.round(dist * 1000);
  dist = dist / 1000;

  return dist;
};
