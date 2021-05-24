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
            fetch("https://api.airtable.com/v0/appV1l6i5krPZ1A9w/Table%202", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer key2Rz6y5n7q7ZLGu",
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
