export const extimateDistanceFromRSSI = (rssi) => {
  let coeffs = [6.6401393230298815, 0.27683540449018756, 0.0028641412384319276];
  let dist = 0;
  for (let i = 0; i < coeffs.length; i++) {
    dist += coeffs[i] * Math.pow(rssi, i);
  }

  dist = Math.round(dist * 1000);
  dist = dist / 1000;

  return dist;
};
