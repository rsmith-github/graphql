import './App.css';

import React from "react";
import { request, gql } from "graphql-request";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

import LineChart from './LineChart';

const client = new QueryClient();
const endpoint = "https://learn.01founders.co/api/graphql-engine/v1/graphql";

function App() {

  return (
    <QueryClientProvider client={client}>
      <h1>GraphQL</h1>
      <div className="App">
        <Profile />
        <Ratio />
        <Projects />
        <Graphs />
      </div>
    </QueryClientProvider>
  );
}

export function Profile() {

  const USERS_QUERY = `
  {
        user(where: { id: { _eq: 1954 }}){
          id
          login
        }
        transaction(where: { userId: { _eq: 1954 }, path: {_like: "%image-upload"}, type: {_eq: "level"}}){
          userId
          type
          amount
        }
  }
  `;

  const { data, isLoading, error } = useQuery("users", () => {
    return request(endpoint, USERS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;


  return (
    <div className='page top-left' id='profile'>
      {data.user.map((user) => (
        <h2 id='profile-header'>ID: {user.id}, Login: {user.login}</h2>
      ))}
      {data.transaction.map((transaction) => (
        <h2 id='login'>{transaction.type}: {transaction.amount}</h2>
      ))}
    </div>
  );
}

export function Ratio() {

  return (
    <div className='page top-right' id='ratio'>
      <h2>Some Ratio</h2>
    </div>
  );
}
export function Projects() {

  const PROJECTS_QUERY = `
  {
      transaction(where: { userId: { _eq: 1954 }, path: {_like: "%piscine-go/quest-%"}}){
          type
          amount
          objectId
          createdAt
          object {
          id
            name
          }
      }
  }
  `;

  const { data, isLoading, error } = useQuery("projects", () => {
    return request(endpoint, PROJECTS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;


  return (
    <div className='page bottom' id='projects'>
      <h2>XP in Piscine-Go</h2>
      {/* <LineChart 
          // object.name and amount
          xyPoints={data}
      /> */}

      {data.transaction.map((project) => (
        <>
          <p key={project.id}>
            <span>Challenge Name: </span>{project.object.name}
          </p>
          <p>
            <span>XP: </span>{project.amount}
          </p>
          <br></br>
        </>
      ))}

    </div >
  );
}
export function Graphs() {

  const PROJECTS_QUERY = `
  {
      transaction(where: { userId: { _eq: 1954 }, path: {_like: "%piscine-go/quest-%"}}){
          type
          amount
          objectId
          createdAt
          object {
          id
            name
          }
      }
  }
  `;

  const { data, isLoading, error } = useQuery("projects", () => {
    return request(endpoint, PROJECTS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;


  return (
    <div className='page' id='graphs'>
      <h2>XP in Piscine-Go (graph)</h2>
      <LineChart
        // object.name and amount
        xyPoints={data}
      />

    </div >
  );
}


export default App;
