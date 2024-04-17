window.onload = function () {

    document.getElementById("btGoogle").addEventListener("click", () => {
    
        window.location = '/google/auth'
    
    });

    document.getElementById("btSlack").addEventListener("click", () => {
     
        window.location = `/slack/auth`

    });

};
