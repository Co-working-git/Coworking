"use strict"
    const data = "https://api.airtable.com/v0/appV1l6i5krPZ1A9w/Table%201/"

    let data2;
    
    window.addEventListener("load", function(){
        getProjects();
    })

    function getProjects(){

        fetch("https://api.airtable.com/v0/appV1l6i5krPZ1A9w/Table%201/?limit=4", {
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
                                        <p>Creator Name: ${record.fields.NameCreator}</p>
                                        <p>Creation Name: ${record.fields.NameCreation}</p>
                                        <i id="${record.id}" onclick="getId(this)">Load project</i>
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
                    modal.style.display = "none";
                    amountGrid--;
                    createGrid();
                    console.log(amountGrid);
                    })
        .catch((err) => console.log(err));
    }
    //post Projects
    function readFile2(input) {
    

           
    }
    function postProject(){
        let nameCreator = document.getElementById('fName').value;
        let nameCreation = document.getElementById('creationName').value;
        let file2 = document.getElementById("myFile2").files[0];
        let reader2 = new FileReader();
        let creations;
        reader2.readAsText(file2);
         
        reader2.onerror = function() {
          console.log(reader2.error);
        };
        reader2.onload = function() {
            creations = reader2.result;
            let post = {
                    "fields":{
                        "NameCreator" : nameCreator,
                        "NameCreation" : nameCreation,
                        "Creations" : creations
                    }
                };
            console.log(post);
            fetch("https://api.airtable.com/v0/appV1l6i5krPZ1A9w/Table%201" , {
                
                "method": "POST",
                "headers": {
                    "Accept" : "application/json",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer key2Rz6y5n7q7ZLGu"
                },
                "body": JSON.stringify(post)
              })
              .then(response => {
                console.log(response);
                window.location.reload();
              })
              .catch(err => {
                console.error(err);
              });
              console.log("upload complete");
              
        };

    }

    
