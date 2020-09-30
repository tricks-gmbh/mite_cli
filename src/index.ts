require("dotenv").config();

import fetch from "node-fetch";
import { Response, TimeEntry } from "./types";
import { company, fetchOptions } from "./settings";
import workdaysBetweenPastAndNow from "./workdaysBetweenPastAndNow";
import displayAllTimeEntries from "./displayAllTimeEntries";
import getOptionsSortedByUse from "./getOptionsSortedByUse";

const inquirer = require("inquirer");

async function getTimeEntries(at: string) {
  const url = `https://${company}.mite.yo.lk/time_entries.json?user_id=current&at=${at}`;
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    console.error("Response not ok, API-Key korrekt? :/");
    process.exit(1);
  }
  const json: Response[] = await response.json();
  const entries = json.map((entry) => entry.time_entry);
  return entries;
}

async function getTimeEntriesFromLastAndThisWeek() {
  return [
    ...(await getTimeEntries("last_week")),
    ...(await getTimeEntries("this_week")),
  ].sort((a, b) => String(a.date_at).localeCompare(String(b.date_at)));
}

async function setTimeEntries(date: Date, project: number, hours: number) {}

async function main() {
  const entries = await getTimeEntriesFromLastAndThisWeek();
  displayAllTimeEntries(entries);
  const lastDate = entries[entries.length - 1].date_at;
  const projects = getOptionsSortedByUse(entries, (entry) => ({
    name: entry.project_name,
    value: entry.project_id,
  }));

  const services = getOptionsSortedByUse(entries, (entry) => ({
    name: entry.service_name,
    value: entry.service_id,
  }));

  const defaultHours = getOptionsSortedByUse(entries, (entry) => ({
    value: entry.minutes / 60,
  }));

  const b = await inquirer.prompt([
    {
      name: "day",
      message: "Day",
      type: "list",
      choices: workdaysBetweenPastAndNow(lastDate),
    },
    {
      name: "project",
      message: "Project",
      type: "list",
      choices: projects,
    },
    {
      name: "service",
      message: "Service",
      type: "list",
      choices: services,
    },
    {
      name: "hours",
      message: "Hours",
      type: "number",
      default: defaultHours[0].value,
    },
  ]);
  console.log(b);
}

main();
