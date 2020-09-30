require("dotenv").config();

import fetch from "node-fetch";
import { Response } from "./types";
import { company, fetchOptions } from "./settings";
import workdaysBetweenPastAndNow from "./workdaysBetweenPastAndNow";

const inquirer = require("inquirer");

async function getTimeEntries(at: string) {
  const url = `https://${company}.mite.yo.lk/time_entries.json?user_id=current&at=${at}`;
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    console.error("Reponse not ok :/");
    process.exit(1);
  }
  const json: Response[] = await response.json();
  const entries = json.map((entry) => ({
    ...entry.time_entry,
  }));
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
  const lastDate = entries[entries.length - 1].date_at;
  const projects = Array.from(new Set(entries.map((p) => p.project_name)));
  entries.forEach((i) => console.log(i.date_at, i.minutes / 60, i.project_name));

  const b = await inquirer.prompt([
    {
      name: "day",
      message: "Tag",
      type: "list",
      choices: workdaysBetweenPastAndNow(lastDate),
    },
    {
      name: "project",
      message: "Projekt",
      type: "list",
      choices: projects,
    },
    {
      name: "hours",
      message: "Stunden",
      type: "number",
    },
  ]);
  console.log(b);
}

main();
