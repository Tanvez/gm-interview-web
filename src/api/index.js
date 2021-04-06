import { gql } from "@apollo/client";
export const GET_ENTRIES = gql`
  query GetEntries {
    Entries {
      client
      project
      projectCode
      firstName
      lastName
      hours
      billable
      billableRate
    }
  }
`;