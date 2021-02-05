import Table from 'cli-table3';
import weekday from './weekday';
import { TimeEntry } from './types';

export default (entries: TimeEntry[]) => {
  const table = new Table({
    head: ['date', 'hours', 'project', 'service'],
  });

  //   table.push(["First value", "Second value", '123']);
  entries.forEach((entries) => {
    table.push([
      `${weekday(entries.date_at)} ${String(entries.date_at)}`,
      entries.minutes / 60,
      `${entries.customer_name.substring(0, 10)} / ${entries.project_name}`,
      entries.service_name,
    ]);
  });

  console.log(table.toString());
};
