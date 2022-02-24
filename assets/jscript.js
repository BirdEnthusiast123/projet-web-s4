

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

    scroll(dir) 
    {
        const width = this.scrollable.clientWidth;
        if ("scrollBehavior" in document.documentElement.style)
        {
            // chrome and firefox
            this.scrollable.scrollBy(
            {
                left: width * dir,
                top: 0,
                behavior: "smooth"
            });
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
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Init duck petting
    document.getElementById("duck").addEventListener("click", pet_duck);

    // Init carouser sliders
    document.querySelectorAll(".slide").forEach(e => new CarouselSlider(e));

    // Init menu
    document.querySelector("nav")
        .addEventListener
        (
            "click",
            function() { this.classList.toggle("displayed"); }
        );
});



