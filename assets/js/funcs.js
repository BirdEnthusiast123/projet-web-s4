const BODY = document.querySelector("body");

export const PINK = getComputedStyle(BODY).getPropertyValue('--pink');
export const BLUE1 = getComputedStyle(BODY).getPropertyValue('--blue1');
export const BLUE2 = getComputedStyle(BODY).getPropertyValue('--blue2');
export const GREEN1 = getComputedStyle(BODY).getPropertyValue('--green1');
export const GREEN2 = getComputedStyle(BODY).getPropertyValue('--green2');


// Pet the duck !!!
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const pet_duck = async function()
{
    var duck = (document.querySelectorAll("img"))[0]; 
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