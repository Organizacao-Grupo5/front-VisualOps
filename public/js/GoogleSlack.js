window.onload = function () {

    document.getElementById("btGoogle").addEventListener("click", () => {
    
        window.location.href = '/google/auth'
    
    });

    document.getElementById("btSlack").addEventListener("click", () => {
     
        window.location.href = `/slack/auth`

    });

};
