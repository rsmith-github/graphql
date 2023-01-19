import './App.css';

import React from "react";
import { useState, useEffect } from 'react';
import { request, gql } from "graphql-request";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

// Carousel
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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

      <div class="patterns">
        <svg width="100%" height="30%">
          <text x="50%" y="80%" text-anchor="middle"  >
            GraphQL
          </text>
        </svg>
      </div>

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

// Skills data (carousel)
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
    <div className='page top-center' id='ratio'>
      <h2>Skills</h2>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={20}
        totalSlides={skillsArray.length}
        infinite={true}
      >
        {/* {skillsArray.map((skill, ind) => (
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
      ))} */}
        <Slider>

          {skillsArray.map((skill, ind) => (
            <Slide index={ind}>
              <p className='skill-type' style={{ color: `${skill.color}`, textAlign: 'center', fontSize: "25px", marginBottom: '10px' }}>
                {skill.name}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <p>
                  <span>Total Skill Points: </span> <span className='number'>{skill.skill_points}</span>
                </p>
                <p>
                  <span>Projects completed: </span> <span className='number'>{skill.projects_completed}</span>
                </p>
              </div>
            </Slide>
          ))}
        </Slider>
        <div className='crslBtnContainer'>
          <ButtonBack className='sliderBtn'>&#8249;</ButtonBack>
          <ButtonNext className='sliderBtn'>&#8250;</ButtonNext>
        </div>
      </CarouselProvider>
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
    <div className='page top-right' id='projects'>
      <h2>XP in Piscine-Go</h2>
      <div style={{ overflow: 'auto', height: '185px' }}>
        {data.transaction.map((project) => (
          <div>
            <p key={"project-" + project.id}>
              <span>Challenge Name: </span>{project.object.name}
            </p>
            <p>
              <span>XP: </span>{project.amount} <span>kB</span>
            </p>
            <br></br>
          </div>
        ))}
      </div>
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

    <div className='page bottom-left' id='Graph1'>
      <>
        <h2>XP Gained - First 30 Exercises (Piscine-Go)</h2>
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
    <div className='page bottom-right' id='Graph2'>
      <h2>Skills Chart</h2>

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
        skill.color = "teal"
        break;
      case "skill_prog":
        skill.type = "Programming"
        skill.color = "#306998"
        break;
      case "skill_html":
        skill.type = "HTML"
        skill.color = "#e34c26"
        break;
      case "skill_css":
        skill.type = "CSS"
        skill.color = "#264de4"
        break;
      case "skill_js":
        skill.type = "JavaScript"
        skill.color = "#F0DB4F"
        break;
      case "skill_go":
        skill.type = "Golang"
        skill.color = "#29BEB0"
        break;
      case "skill_front-end":
        skill.type = "Frontend"
        skill.color = "#a4c639"

        break;
      case "skill_back-end":
        skill.type = "Backend"
        skill.color = "firebrick"
        break;
      case "skill_sql":
        skill.type = "SQL"
        skill.color = "#b100cd"
        break;
      case "skill_docker":
        skill.type = "Docker"
        skill.color = "#0db7ed"
        break;
      case "skill_sys-admin":
        skill.type = "Systems Administration"
        skill.color = "#DBE4EB"
        break;
      case "skill_game":
        skill.type = "Game Development"
        skill.color = "deeppink"
        break;
      case "skill_stats":
        skill.type = "Statistics"
        skill.color = "green"
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
        projects_completed: skills[skill.type].projects_completed + 1,
        color: skill.color
      }

    } else {
      skills[skill.type] = {
        name: skill.type,
        skill_points: skill.amount,
        projects_completed: 1,
        color: skill.color
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