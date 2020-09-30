export interface Response {
  time_entry: TimeEntry;
}
export interface TimeEntry {
  billable: boolean;
  created_at: Date;
  date_at: Date;
  id: number;
  locked: boolean;
  minutes: number;
  project_id: number;
  revenue: number;
  hourly_rate: number;
  service_id: number;
  updated_at: Date;
  user_id: number;
  note: string;
  user_name: string;
  customer_id: number;
  customer_name: string;
  project_name: string;
  service_name: string;
}

export interface TimeEntryPostBody {
  time_entry: {
    date_at: Date /** Datum des Zeiteintrages im Format YYYY-MM-DD. Default: Heute */;
    minutes: number /** Minuten */;
    note?: string /** Beschreibung */;
    project_id: number /** Projekt-ID */;
    service_id: number /** Leistung */;
  };
}
