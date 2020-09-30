import { isHoliday } from "feiertagejs";

function getDaysArray(start: Date, end: Date) {
  const arr = [];
  const dt = new Date(start);
  for (; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}

function arrayOfDaysBetweenPastAndNow(pastDate: Date | string) {
  const daylist = getDaysArray(new Date(pastDate), new Date());
  daylist.map((v) => v.toISOString().slice(0, 10)).join("");
  return daylist;
}

const isWeekend = (date: Date) => date.getDay() === 6 || date.getDay() === 0;

export default (past: Date) =>
  arrayOfDaysBetweenPastAndNow(past)
    .filter((d) => !isWeekend(d) && !isHoliday(d, "NW"))
    .map((d) => d.toISOString().substr(0, 10));
