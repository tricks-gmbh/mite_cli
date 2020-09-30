import fetch, { RequestInit } from "node-fetch";
import { company, fetchOptions } from "./settings";
import { TimeEntryPostBody } from "./types";

async function addTimeEntry({
  date_at,
  project_id,
  service_id,
  hours,
}: {
  date_at: Date;
  project_id: number;
  service_id: number;
  hours: number;
}) {
  const url = `https://${company}.mite.yo.lk/time_entries.json`;
  const newEntry: TimeEntryPostBody = {
    time_entry: {
      date_at,
      project_id,
      service_id,
      note: "",
      minutes: hours * 60,
    },
  };
  const body = JSON.stringify(newEntry);
//   console.log(body);
  const options: RequestInit = {
    ...fetchOptions,
    method: "POST",
    body,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    console.error("Wrong Response", response);
    process.exit(1);
  }
  const json = await response.json();
  console.log("ok", json);
}

export default addTimeEntry;
