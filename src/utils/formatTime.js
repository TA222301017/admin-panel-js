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
