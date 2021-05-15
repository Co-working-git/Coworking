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
                    amountGrid--;
                    createGrid();
                    console.log(amountGrid);
                    fuckPutItBackIn();
                    modal.style.display = "none";
                    })
        .catch((err) => console.log(err));
    }
    /*puts grid behind objects*/
    function fuckPutItBackIn() {
        canvas.forEachObject(function(obj) {
            if (obj.id && obj.id === 'gridId') canvas.sendToBack(obj);;
        });
    }
    
