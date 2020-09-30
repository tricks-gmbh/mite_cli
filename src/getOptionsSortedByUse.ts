import { TimeEntry } from "./types";

export default (
  entries: TimeEntry[],
  optionsCallback: (entry: TimeEntry) => { name?: string; value: number }
) => {
  return Object.values(
    entries.reduce<{
      [pid: string]: { count: number; name: string; value: number };
    }>(
      (prev, entry) => ({
        ...prev,
        [entry.project_id]: {
          ...optionsCallback(entry),
          count:
            ((prev[entry.project_id] && prev[entry.project_id].count) || 0) + 1,
        },
      }),
      {}
    )
  ).sort((a, b) => (a.count > b.count ? -1 : 1));
};
