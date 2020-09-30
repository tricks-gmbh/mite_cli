import Table from "cli-table3";
import { TimeEntry } from "./types";

export default (entries: TimeEntry[]) => {
  const table = new Table({
    head: ["date", "hours", "project", "service"],
  });

  //   table.push(["First value", "Second value", '123']);
  entries.forEach((entries) => {
    table.push([
      String(entries.date_at),
      entries.minutes / 60,
      entries.project_name,
      entries.service_name
    ]);
  });

  console.log(table.toString());
};
