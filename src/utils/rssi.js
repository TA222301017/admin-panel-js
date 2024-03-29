const rssi_map = {
  "-98": 7.0,
  "-97": 7.0,
  "-96": 6.0,
  "-95": 6.0,
  "-94": 6.0,
  "-93": 6.0,
  "-92": 5.0,
  "-91": 5.0,
  "-90": 5.0,
  "-89": 5.0,
  "-88": 4.0,
  "-87": 4.0,
  "-86": 4.0,
  "-85": 4.0,
  "-84": 4.0,
  "-83": 3.0,
  "-82": 3.0,
  "-81": 3.0,
  "-80": 3.0,
  "-79": 3.0,
  "-78": 2.0,
  "-77": 2.0,
  "-76": 2.0,
  "-75": 2.0,
  "-74": 2.0,
  "-73": 2.0,
  "-72": 2.0,
  "-71": 1.0,
  "-70": 1.0,
  "-69": 1.0,
  "-68": 1.0,
  "-67": 1.0,
  "-66": 1.0,
  "-65": 1.0,
  "-64": 1.0,
  "-63": 1.0,
  "-62": 1.0,
  "-61": 0.5,
  "-60": 0.5,
  "-59": 0.5,
  "-58": 0.5,
  "-57": 0.5,
  "-56": 0.5,
  "-55": 0.5,
  "-54": 0.5,
  "-53": 0.5,
  "-52": 0.5,
  "-51": 0.5,
  "-50": 0.5,
  "-49": 0.5,
  "-48": 0.5,
  "-47": 0.5,
  "-46": 0.5,
  "-45": 0.5,
  "-44": 0.5,
};

export const extimateDistanceFromRSSI = (rssi) => {
  // let coeffs = [6.6401393230298815, 0.27683540449018756, 0.0028641412384319276];
  // let dist = 0;
  // for (let i = 0; i < coeffs.length; i++) {
  //   dist += coeffs[i] * Math.pow(rssi, i);
  // }

  // dist = Math.round(dist * 1000);
  // dist = dist / 1000;

  // if (rssi > -44) {
  //   return 0.5;
  // }

  // if (rssi < -99) {
  //   return 7;
  // }

  // return rssi_map[String(rssi)];
  // [-64.25885507   3.60937541]
  return Math.pow(10, (-64.25885507 - rssi) / (10 * 3.60937541));
};

export const triangulate = (xa, xb, xc, ya, yb, yc, ra, rb, rc) => {
  var A = 2 * (xa - xc);
  var B = 2 * (ya - yc);
  var C = 2 * (xb - xc);
  var D = 2 * (yb - yc);

  var E =
    Math.pow(xa, 2) -
    Math.pow(xc, 2) +
    Math.pow(ya, 2) -
    Math.pow(yc, 2) +
    Math.pow(rc, 2) -
    Math.pow(ra, 2);
  var F =
    Math.pow(xb, 2) -
    Math.pow(xc, 2) +
    Math.pow(yb, 2) -
    Math.pow(yc, 2) +
    Math.pow(rc, 2) -
    Math.pow(rb, 2);

  // Equations
  var x = (D * E - B * F) / (A * D - B * C);
  var y = (A * F - C * E) / (A * D - B * C);

  return { x, y };
};
