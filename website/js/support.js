;(function() {
    'use strict';
    window.addEventListener('load', function () {
        document.querySelector("form").addEventListener("submit", function(event) {
            let firstname = document.getElementById("firstName").value;
            let lastname = document.getElementById("lastName").value;
            let email = document.getElementById("email").value;
            let message = document.getElementById("message").value;
            let frm = document.getElementById("supportForm");
            frm.reset();
            let bericht = {
                "records": [{
                    "fields": {
                        "firstname": firstname,
                        "lastname": lastname,
                        "email": email,
                        "message": message
                    }
                }]
            };
            fetch("https://api.airtable.com/v0/appbBk51vBbueJAmO/support", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer keyvVyiDN8TvAXQ5q",
                    "Content-Type": "application/json"
                },
                body: (JSON.stringify(bericht))
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch((err) => window.alert(err));
            event.preventDefault();
        });
    })
})();
