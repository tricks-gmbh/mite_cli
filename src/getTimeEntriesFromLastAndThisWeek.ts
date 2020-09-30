import fetch from "node-fetch";
import { company, fetchOptions } from "./settings";
import { TimeEntryResponse } from "./types";

async function getTimeEntries(at: string) {
  const url = `https://${company}.mite.yo.lk/time_entries.json?user_id=current&at=${at}`;
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    console.error("Response not ok, API-Key korrekt? :/");
    process.exit(1);
  }
  const json: TimeEntryResponse[] = await response.json();
  const entries = json.map((entry) => entry.time_entry);
  return entries;
}

async function getTimeEntriesFromLastAndThisWeek() {
  return [
    ...(await getTimeEntries("last_week")),
    ...(await getTimeEntries("this_week")),
  ].sort((a, b) => String(a.date_at).localeCompare(String(b.date_at)));
}

export default getTimeEntriesFromLastAndThisWeek;
