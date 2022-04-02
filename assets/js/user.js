document.addEventListener("DOMContentLoaded", function() {
    const p = document.querySelector("button + p");
    document.querySelector("button")
            .addEventListener("click", () => {
                fetch('http://localhost:8000/assets/php/bdd.php')
                .then((response) => {
                  response.json().then((res) => {
                            res.forEach((res) => {
                                p.innerHTML += "id: " + res.username + "</br>";
                                p.innerHTML += "pwd: " + res.password + "</br></br>";
                            })
                          })
                })
                .catch(() => {console.log("ajax fetch failed")})
            })
});