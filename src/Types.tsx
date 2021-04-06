export interface Entry {
  client: string;
  project: string;
  projectCode: string;
  hours: string;
  firstName: string;
  lastName: string;
  billable: boolean;
  billableRate: number;
}

export interface EntriesDataTypes {
Entries: Entry[];
}

export interface FormattedEntriesTypes {
  project: string;
  client: string;
  billableHours: number;
  billableAmount: number;
  hours: number;
}