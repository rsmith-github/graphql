import './App.css';

import React from "react";
import { useState, useEffect } from 'react';
import { request, gql } from "graphql-request";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

// import LineChart from './LineChart';
import LineChart from "./components/LineChart";
import Label from "./components/AxisLabel";
import ChartTitle from "./components/ChartTitle";
import BarChart from "./components/BarChart";

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
        <Graph1 />
        <Graph2 />
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
        transaction(where: { userId: { _eq: 1954 }, path: {_like: "%real-time-forum"}, type: {_eq: "level"}}){
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
      {data.transaction.filter((transaction, index) => transaction.amount === 19).map((transaction) => (
        <h2 id='level'>{transaction.type}: {transaction.amount}</h2>
      ))}
    </div>
  );
}
// Some other data that will be used to generate a chart.
export function Ratio() {

  const SKILLS_QUERY = `
    {
      transaction(where: { userId: { _eq: 1954 }, type: {_like: "%skill%"}}){
        type
        amount
      }
      
    }
  `;

  const { data, isLoading, error } = useQuery("skills", () => {
    return request(endpoint, SKILLS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;


  let skillsArray = cleanUpSkills(data)

  return (
    <div className='page top-right' id='ratio'>
      <h2>Skills</h2>
      {skillsArray.map((skill) => (
        <>
          <p className='skill-type'>
            {skill.name}
          </p>
          <p>
            <span>Total Skill Points: </span>{skill.skill_points}
          </p>
          <p>
            <span>Projects/Exercises completed: </span>{skill.projects_completed}
          </p>
          <br></br>
        </>
      ))}
    </div>
  );
}


// Projects in piscine-go
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

      {data.transaction.map((project) => (
        <>
          <p key={"project-" + project.id}>
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



const styles = {
  chartComponentsContainer: {
    display: 'grid', gridTemplateColumns: 'max-content 700px', alignItems: 'center'
  },
  chartWrapper: { maxWidth: 700, alignSelf: 'flex-start' }
}


export function Graph1() {

  const [amount, setAmount] = useState()
  const [exercise, setExercise] = useState()
  const [show, setShow] = useState(false);


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

  const { data, isLoading, error } = useQuery("piscine-go", () => {
    return request(endpoint, PROJECTS_QUERY);
  });


  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;



  const Data = [];


  data.transaction.forEach((transaction, ind) => {
    if (ind < 30) {
      let temp = {
        label: transaction.object.name,
        x: ind,
        y: transaction.amount
      };
      Data.push(temp)
    }
  });



  return (

    <div className='page' id='Graph1'>
      {
        show &&
        <>
          <h2 onClick={() => setShow(!show)}>XP Gained - First 30 Exercises (Piscine-Go)</h2>
          <LineChart
            width={500}
            height={300}
            data={Data}
            horizontalGuides={15}
            verticalGuides={15}
            precision={2}
            amount={amount}
            setAmount={setAmount}
            exercise={exercise}
            setExercise={setExercise}
          />
          {
            amount &&
            <p>{exercise}: <span>{amount}</span></p>
          }
          {
            !amount &&
            <p>Exercise: <span>N/A</span> </p>
          }
        </>
      }

      {
        !show && <p onClick={() => setShow(!show)} id="titleGraph1">XP in Piscine-Go</p>
      }
    </div >
  );
}

export function Graph2() {

  const PROJECTS_QUERY = `
  {
    transaction(where: { userId: { _eq: 1954 }, type: {_like: "%skill%"}}){
      type
      amount
    }
  }
  `;

  const { data, isLoading, error } = useQuery("idk", () => {
    return request(endpoint, PROJECTS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  let skillsArray = cleanUpSkills(data)

  return (
    <div className='page' id='Graph2'>
      <h2>Another chart</h2>

      <BarChart data={skillsArray} />

    </div >
  );
}











// format skills and return cumulative skill points for each skill.
function cleanUpSkills(data) {
  data.transaction.forEach(skill => {
    switch (skill.type) {
      case "skill_algo":
        skill.type = "Algorithms"
        break;
      case "skill_prog":
        skill.type = "Programming"
        break;
      case "skill_html":
        skill.type = "HTML"
        break;
      case "skill_css":
        skill.type = "CSS"
        break;
      case "skill_js":
        skill.type = "JavaScript"
        break;
      case "skill_go":
        skill.type = "Golang"
        break;
      case "skill_front-end":
        skill.type = "Frontend"
        break;
      case "skill_back-end":
        skill.type = "Backend"
        break;
      case "skill_sql":
        skill.type = "SQL"
        break;
      case "skill_docker":
        skill.type = "Docker"
        break;
      case "skill_sys-admin":
        skill.type = "Systems Administration"
        break;
      case "skill_game":
        skill.type = "Game Development"
        break;
      case "skill_stats":
        skill.type = "Statistics"
        break;
      default:
        break;
    }
  })

  let skills = {}

  data.transaction.forEach(skill => {

    // Cumulative skill points and projects completed
    if (!!skills[skill.type]) {
      skills[skill.type] = {
        name: skill.type,
        skill_points: skill.amount + skills[skill.type].skill_points,
        projects_completed: skills[skill.type].projects_completed + 1
      }

    } else {
      skills[skill.type] = {
        name: skill.type,
        skill_points: skill.amount,
        projects_completed: 1

      }
    }

  });

  return Object.values(skills);


}







export default App;



// different query
// user(where: { id: { _eq: 1954 }}){
//   id
//   login
// }
// result(where: { userId: { _eq: 1954 } }){
//   userId
//   userLogin	
//   type
//   grade
//   path
// }