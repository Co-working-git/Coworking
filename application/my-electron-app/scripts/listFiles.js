"use strict"
    const data = "https://api.airtable.com/v0/appV1l6i5krPZ1A9w/Table%201/"
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
                    console.log(records);
                    records.records.forEach(record => {
                        let post = `<div class="post">
                                        <h2>Projects babyyyyyy<h2>
                                        <p>Creator Name: ${record.fields.NameCreator}</p>
                                        <p>Creation Name: ${record.fields.NameCreation}</p>
                                        <button id="${record.id}" onclick="getId(this)">Click me for drugs</P>
                                    </div>`
                        document.getElementById("projects").innerHTML += post;
                    })
            })
        .catch((err) => console.log(err)); 
    }
    function getId(btn){
        data2 = "https://api.airtable.com/v0/appV1l6i5krPZ1A9w/Table%201/"+btn.id;
        fetch(data2, {
            headers: {
                'Authorization' : 'Bearer key2Rz6y5n7q7ZLGu'
            }
        })
        .then((response) =>{
            return (response.json());
        })
        .then((records) =>{
                    console.log(records);
                    let saveData = records.fields.Creations;
                    canvas.loadFromJSON(saveData);
                    })
        .catch((err) => console.log(err));
    }
    
