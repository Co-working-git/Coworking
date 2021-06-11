"use strict"
    let i2 = 100;
    let i = 0;
    const data = "https://api.airtable.com/v0/appV1l6i5krPZ1A9w/Table%201/"
    var projects = ["project1.png", "project2.png", "project3.png", "project4.png", "project5.png", "project6.png", "project7.png", "project8.png", "project9.png","project10.png"]
    let data2;
    window.addEventListener("load", function(){
        getProjects();
    })

    function getProjects(){
        fetch(data, {
            headers: {
                'Authorization' : 'Bearer key2Rz6y5n7q7ZLGu'
            }
        })
        .then((response) =>{
            return (response.json());
        })
        .then((records) =>{
                    document.getElementById("projects").innerHTML = "";
                    console.log(records);
                    records.records.forEach(record => {
                        i = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
                        while(i2 == i){
                         i = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
                        }
                        i2 = i;
                        let post = `<div class="card">
                                <img draggable="false" alt="project picture" src="img/${projects[i]}">
                                        <p>Creator Name: ${record.fields.NameCreator}</p>
                                        <p>Creation Name: ${record.fields.NameCreation}</p>
                                    </div>`
                        document.getElementById("projects").innerHTML += post;
                    })
            })
        .catch((err) => console.log(err)); 
    }