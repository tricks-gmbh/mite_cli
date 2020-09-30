require("dotenv").config();

import workdaysBetweenPastAndNow from "./workdaysBetweenPastAndNow";
import displayAllTimeEntries from "./displayAllTimeEntries";
import getOptionsSortedByUse from "./getOptionsSortedByUse";
import getTimeEntriesFromLastAndThisWeek from "./getTimeEntriesFromLastAndThisWeek";
import addTimeEntry from "./addTimeEntry";

const inquirer = require("inquirer");

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

  const inputValues = await inquirer.prompt([
    {
      name: "date_at",
      message: "Day",
      type: "list",
      choices: workdaysBetweenPastAndNow(lastDate),
    },
    {
      name: "project_id",
      message: "Project",
      type: "list",
      choices: projects,
    },
    {
      name: "service_id",
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
  //   console.log(inputValues);
  addTimeEntry(inputValues);
}

main();
