export const extimateDistanceFromRSSI = (rssi) => {
  //   let intercept = 11.084928153031766;
  let coeffs = [6.6401393230298815, 0.27683540449018756, 0.0028641412384319276];
  // 10^((Measured Power - Instant RSSI)/10*N)
  //   let N = 2.4;
  //   let rssiAt1m = -59;
  let dist = 0;
  for (let i = 0; i < coeffs.length; i++) {
    dist += coeffs[i] * Math.pow(rssi, i);
  }

  dist = Math.round(dist * 1000);
  dist = dist / 1000;

  return dist;
};
