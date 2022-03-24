import 
{
    pet_duck,
    sleep
} from "./funcs.js"

// Sliding carousel
// Modifications du code de Jacob Avery : https://codepen.io/jakeave/pen/MNqxxL
class CarouselSlider 
{
    constructor(element) 
    {
        this.element = element;
        this.scrollable = element.querySelector(".scrollable");
        this.arrows = element.querySelectorAll(".arrow");

        // addEventListener change le 'contexte' d'appel de la fonction
        // Il faut passer par une fonction fléchée afin d'utiliser 'this'
        this.scrollable.addEventListener("scroll", () => this.toggleArrows());
        this.arrows[0].addEventListener("click", () => this.scroll(-1));
        this.arrows[1].addEventListener("click", () => this.scroll(1));

        this.isBeingCalled = false;
    }   

    toggleArrows() 
    {
        if (this.scrollable.scrollWidth > this.scrollable.clientWidth) {
            if (this.currPos <= 0) 
            {
                this.arrows[0].style.visibility = "hidden";
                this.arrows[1].style.visibility = "visible";
            } else if 
            (
                this.currPos + this.scrollable.clientWidth >=
                this.scrollable.scrollWidth
            ) 
            {
                this.arrows[0].style.visibility = "visible";
                this.arrows[1].style.visibility = "hidden";
            } else 
            {
                this.arrows[0].style.visibility = "visible";
                this.arrows[1].style.visibility = "visible";
            }
        }
    }

    get currPos() 
    {
        return this.scrollable.scrollLeft;
    }

    async scroll(dir) 
    {
        if(this.isBeingCalled)
        {
            return;
        }

        this.isBeingCalled = true;
        const width = this.scrollable.clientWidth;
        if ("scrollBehavior" in document.documentElement.style)
        {
            // chrome and firefox
            this.scrollable.scrollBy(
            {
                left: width * dir,
                behavior: "smooth"
            });

            // Empêche les appels multiples
            // étant donné que get currPos est mis à jour au fur et à mesure
            await sleep(600);
        }
        else 
        {
            try 
            {
                // safari
                this.scrollable.scrollBy(width * dir, 0);
            } 
            catch (error) 
            {
                // edge
                this.scrollable.scrollLeft = this.currPos + dir * width;
            }
        }

        this.isBeingCalled = false;
    }
}

const parseId = (id, pwd) =>
{
    let res1 = id.match(/^[a-z0-9-_.]+@[a-z0-9-_.]+\.[a-z]{2,}$/);
    let res2 = pwd.match(/^.{4,}/);

    return (res1 != null) && (res2 != null);
}

const switch_id_to_red = () =>
{
    // communicate to the user that the format of the id is wrong
    let boxes = document.querySelectorAll("footer input");
    boxes.forEach(box => box.style.border-color = "red")
}

document.addEventListener("DOMContentLoaded", function() {
    // Init duck petting
    document.querySelectorAll("img")[0].addEventListener("click", pet_duck);

    // Init carouser sliders
    document.querySelectorAll(".slide").forEach(e => 
        {
            let tmp = new CarouselSlider(e)
            tmp.toggleArrows();
        });
    

    // Init menu
    document.querySelector("nav")
        .addEventListener
        (
            "click",
            function() { this.classList.toggle("displayed"); }
        );

    // Footer
    document.querySelector("footer label:last-of-type input")
            .addEventListener("click", function(){
                let pwd_check = document.querySelector("footer div input:nth-of-type(2)");
                if(this.checked)
                {
                    pwd_check.type = "text";
                }
                else
                {
                    pwd_check.type = "password";
                }
            })


    document.querySelector("footer button")
            .addEventListener("click", function(){
                let footer_pwd = document.querySelector("footer input:nth-of-type(2)").value;
                let footer_id = document.querySelector("footer input:nth-of-type(1)").value;
                let pre_server = parseId(footer_id, footer_pwd);
                console.log(pre_server);
                if(pre_server)
                {
                    
                }
                else
                {
                    // notify user 
                    switch_id_to_red();
                }
            });

    const section = document.querySelector('section p');
    document.querySelector('.jeux .elem:nth-of-type(4) button')
            .addEventListener('click', () => {
              console.log("here1");
              fetch('http://localhost:8000/assets/php/ajax.php')
                .then((response) => {
                  response.json().then((res) => {
                            res.forEach((res) => {
                                section.innerHTML += res.username;
                                section.innerHTML += res.password;
                            })
                          })
                })
                .catch(() => {console.log("ajax fetch failed")})
            })
});


