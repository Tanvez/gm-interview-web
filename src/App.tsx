import React from 'react';
import { useQuery } from "@apollo/client";
import { EntriesDataTypes } from "./Types";
import { combineProjects } from "./utils";
import { GET_ENTRIES } from './api'
import './App.css';
import BasicTable from './pages/Entries';
import Header from './components/header'

const App = () => {
  const { loading, data, error } = useQuery<EntriesDataTypes>(GET_ENTRIES);
  //TODO add better loading error screens
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  const entries = data && data.Entries ? data.Entries : [];
  const formattedEntries = combineProjects(entries);

  return (
    <>
      <Header formattedEntries={formattedEntries}/>
      <BasicTable formattedEntries={formattedEntries}/>
    </>
  );
}

export default App;
