import { RequestInit } from 'node-fetch';

const apiKey = process.env.APIKEY;
export const company = process.env.COMPANY;

if (!apiKey) {
  console.error('No API Key!');
  process.exit(1);
}
if (apiKey.length !== 16) {
  console.error("API Key isn't 16chars long!");
  process.exit(1);
}
if (!company) {
  console.error(
    'No Company given. Please provide <COMPANY>.mite.yo.lk as Environment Variable',
  );
  process.exit(1);
}

export const fetchOptions: RequestInit = {
  headers: {
    'X-MiteApiKey': apiKey,
    'Content-Type': 'application/json',
    'User-Agent': 'github.com/tricks-gmbh/mite_cli',
  },
};
