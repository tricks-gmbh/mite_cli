import fetch from 'node-fetch';
import { TimeEntry, Response } from './types';

const apiKey = "757832647f37a492";
const fetchOptions = {
    headers: {
        'X-MiteApiKey': apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'tricks mite cli'
    }
};

async function getTimeEntries(at: string) {
    const url = `https://tricks.mite.yo.lk/time_entries.json?user_id=current&at=${at}`;
    const response = await fetch(url, fetchOptions)
    const json: Response[] = await response.json()
    const entries = json.map(entry => ({ date: entry.time_entry.date_at, project: entry.time_entry.project_name, hours: entry.time_entry.minutes / 60 }))
    return entries
}

function arrayOfDaysBetweenPastAndNow(pastDate: Date | string) {
    var getDaysArray = function (start: Date, end: Date) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };

    var daylist = getDaysArray(new Date(pastDate), new Date());
    daylist.map((v) => v.toISOString().slice(0, 10)).join("")
    return daylist;
}

async function main() {
    // process.exit(0);
    const entries = [
        ...await getTimeEntries('last_week'),
        ...await getTimeEntries('this_week')
    ].sort((a, b) => String(a.date).localeCompare(String(b.date)))
    const lastDate = entries[entries.length - 1].date
    entries.forEach(i => console.log(i.date, i.hours, i.project))
    console.log(lastDate);
    const days = arrayOfDaysBetweenPastAndNow(lastDate);
    console.log(days);
}

main();