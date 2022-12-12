
let userPage = document.getElementById("profile");
let projectsPage = document.getElementById("projects");
let ratioPage = document.getElementById("ratio");



const populateUserData = (jsn) => {
    let header = document.getElementById("profile-header")
    header.append(jsn.data.user[0].login)
    let id = document.getElementById("user-id")
    id.append(jsn.data.user[0].id)
}

const queryUser = () => {
    fetch('https://learn.01founders.co/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {	
                    user(where: { id: { _eq: 1954 }}){
                        id
                        login

                    }
                }   
      `,
            variables: {},
        }),
    })
        .then((res) => res.json())
        .then((result) =>

            populateUserData(result)


        );
}

queryUser();


const populateProjectsData = (projects) => {

    projects.forEach(project => {
        let div = document.createElement("div");
        div.append(project.path)
        div.append(project.grade)
        projectsPage.append(div)
    });

    console.log(projects);
}

const queryProjects = () => {
    fetch('https://learn.01founders.co/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {	
                    progress(where: { userId: { _eq: 1954 }, path: {_like: "%piscine-go%", _nlike: "%final-exam%"}}){
                        grade
                      createdAt
                        path
                    }
                }   
      `,
            variables: {},
        }),
    })
        .then((res) => res.json())
        .then((result) =>

            populateProjectsData(result.data.progress)


        );
}

queryProjects();