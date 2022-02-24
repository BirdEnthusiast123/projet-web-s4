// Pet the duck !!!
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function pet_duck()
{
    var duck = document.getElementById("duck"); 
    var duck_width = duck.width;
    var duck_height = duck.height;

    duck.src = "assets/img/pet_duck.gif";
    // gif créé à l'aide de l'outil https://benisland.neocities.org/petpet/
    // développé par Ben Island

    duck.width = duck_width;
    duck.height = duck_height;

    await sleep(1000);

    duck.src = "assets/img/duck.png";
}