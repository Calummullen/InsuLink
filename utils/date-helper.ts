export const ConvertLibreDateToFormattedDate = (libreDate: string) => {
  // Split Date and Time
  const formattedDate = libreDate.split(/(?<=^\S+)\s/);

  // Date
  const splitDate = formattedDate[0].split("/");
  const date = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;

  // Time
  const [splitTime, modifier] = formattedDate[1].split(" ");
  let [hours, minutes] = splitTime.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  const time = `${hours}:${minutes}`;
  return { date, time };
};
