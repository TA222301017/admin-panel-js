export const timeToAPIDateString = (time) => {
  let d = time;
  let year = d.getFullYear();
  let month = (d.getMonth() + 1).toString().padStart(2, "0");
  let day = d.getDate().toString().padStart(2, "0");
  let hour = d.getHours().toString().padStart(2, "0");
  let minute = d.getMinutes().toString().padStart(2, "0");
  let second = d.getSeconds().toString().padStart(2, "0");
  let diff = d.getTimezoneOffset() / 60;
  let offset = `${diff < 0 ? "+" : "-"}${Math.abs(diff)
    .toString()
    .padStart(2, "0")}:00`;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${offset}`;
};

export const timeToDatePickerString = (time) => {
  let date = time.toLocaleDateString();
  let hour = time.getHours().toString().padStart(2, "0");
  let minute = time.getMinutes().toString().padStart(2, "0");

  return `${date} ${hour}:${minute}`;
};

export const timeStringToAPIDateString = (timeString) => {
  let d = new Date(timeString);
  return timeString(d);
};

export const timeToPrettyTimeString = (time) => {
  let d = time;
  let year = d.getFullYear();
  let date = d.getDate();
  let hour = d.getHours().toString().padStart(2, "0");
  let minute = d.getMinutes().toString().padStart(2, "0");
  let diff = d.getTimezoneOffset() / 60;

  let hari = "";
  let bulan = "";
  switch (d.getDay()) {
    case 0:
      hari = "Minggu";
      break;
    case 1:
      hari = "Senin";
      break;
    case 2:
      hari = "Selasa";
      break;
    case 3:
      hari = "Rabu";
      break;
    case 4:
      hari = "Kamis";
      break;
    case 5:
      hari = "Jum'at";
      break;
    case 6:
      hari = "Sabtu";
      break;
  }
  switch (d.getMonth()) {
    case 0:
      bulan = "Januari";
      break;
    case 1:
      bulan = "Februari";
      break;
    case 2:
      bulan = "Maret";
      break;
    case 3:
      bulan = "April";
      break;
    case 4:
      bulan = "Mei";
      break;
    case 5:
      bulan = "Juni";
      break;
    case 6:
      bulan = "Juli";
      break;
    case 7:
      bulan = "Agustus";
      break;
    case 8:
      bulan = "September";
      break;
    case 9:
      bulan = "Oktober";
      break;
    case 10:
      bulan = "November";
      break;
    case 11:
      bulan = "Desember";
      break;
  }

  let zonaWaktu = "";
  switch (diff) {
    case -7:
      zonaWaktu = "WIB";
      break;
    case -8:
      zonaWaktu = "WITA";
      break;
    case -9:
      zonaWaktu = "WIT";
      break;
  }

  return `${hari}, ${date} ${bulan} ${year}, ${hour}:${minute} ${zonaWaktu}`;
};
