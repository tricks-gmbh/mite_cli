require('dotenv').config();

import workdaysBetweenPastAndNow from './workdaysBetweenPastAndNow';
import displayAllTimeEntries from './displayAllTimeEntries';
import getOptionsSortedByUse from './getOptionsSortedByUse';
import getTimeEntriesFromLastAndThisWeek from './getTimeEntriesFromLastAndThisWeek';
import addTimeEntry from './addTimeEntry';
import weekday from './weekday';

const inquirer = require('inquirer');

async function main() {
  let entries = await getTimeEntriesFromLastAndThisWeek();
  displayAllTimeEntries(entries);
  let again;

  do {
    const lastDate: Date = entries.length
      ? entries[entries.length - 1].date_at
      : ((new Date().toISOString().substr(0, 10) as unknown) as Date);
    const projects = getOptionsSortedByUse(entries, (entry) => ({
      name: `${entry.customer_name.substring(0, 10)} / ${entry.project_name}`,
      value: entry.project_id,
    }));

    const services = getOptionsSortedByUse(entries, (entry) => ({
      name: entry.service_name,
      value: entry.service_id,
    }));

    const projectValues: {
      date_at: Date;
      project_id: number;
      service_id: number;
    } = await inquirer.prompt([
      {
        name: 'date_at',
        message: 'Day',
        type: 'list',
        choices: workdaysBetweenPastAndNow(lastDate).map((d) => ({
          name: `${weekday(d)} ${d}`,
          value: d,
        })),
      },
      {
        name: 'project_id',
        message: 'Project',
        type: 'list',
        choices: projects,
      },
      {
        name: 'service_id',
        message: 'Service',
        type: 'list',
        choices: services,
      },
    ]);
    const lastProject = entries
      .reverse()
      .find((e) => e.project_id === projectValues.project_id);
    const entryValues = await inquirer.prompt([
      {
        name: 'hours',
        message: 'Hours',
        type: 'number',
        default: (lastProject?.minutes ?? 480) / 60,
      },
      {
        name: 'Description',
        type: 'input',
        default: lastProject?.note,
      },
    ]);
    await addTimeEntry({
      ...projectValues,
      ...entryValues,
    });
    entries = await getTimeEntriesFromLastAndThisWeek();
    displayAllTimeEntries(entries);

    const { doAgain } = await inquirer.prompt([
      {
        name: 'doAgain',
        message: 'Add more TimeEntries?',
        type: 'confirm',
        default: false,
      },
    ]);
    again = doAgain;
  } while (again);
}

main();
