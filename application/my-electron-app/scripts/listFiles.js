"use strict"
    import fetch from 'electron-fetch'
    const data = "https://api.airtable.com/v0/app9n5ekQCqfOeyaq/Table%201"

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
        records.records.forEach(record =>{
            console.log(record.field.username);
        })
    })
    .catch((err) => console.log(err));
    
