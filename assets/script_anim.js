
// Code double pendule
class Pendule{
    constructor(x, y, m, color)
    {
        //x et y sont la position, m la masse
        this.x = x;
        this.y = y;
        this.rad = 15;
        this.m = m;

        //velocity
        this.v = 0;

        // angle
        this.a = Math.random() + 1.8;

        //couleur
        this.color = color;
    }
}

class DoublePendulum
{
    constructor(canvas, context)
    {
        this.canvas = canvas;
        this.ctx = context;

        this.canvasMinSize = (this.canvas.height < this.canvas.width)? 
                            this.canvas.height: this.canvas.width;

        this.p1 = new Pendule(0, 0, this.canvasMinSize/18, "#7BA86A");
        this.p2 = new Pendule(0, 0, this.canvasMinSize/18, "#48A8A0");
        this.r1 = this.canvasMinSize/6;
        this.r2 = this.r1;

        this.g = this.canvasMinSize/2000;

        this.drawnPoints = new Array();

        this.isAnimated = false;

        this.intervalID = null;
    }


    drawParticle(p)
    {
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color
        this.ctx.arc(p.x, p.y, p.rad, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    calculDeplacements()
    {
        let num1 = -this.g * (2 * this.p1.m + this.p2.m) * Math.sin(this.p1.a);
        let num2 = -this.p2.m * this.g * Math.sin(this.p1.a - (2 * this.p2.a));
        let num3 = -2 * Math.sin(this.p1.a - this.p2.a) * this.p2.m;
        let num4 = this.p2.v * this.p2.v * this.r2;
        num4 += this.p1.v * this.p1.v * this.r1*Math.cos(this.p1.a-this.p2.a);
        let den = 2 * this.p1.m + this.p2.m;
        den -= this.p2.m * Math.cos(2 * this.p1.a - 2 * this.p2.a);
        den *= this.r1;
        let a1_a = (num1 + num2 + num3 * num4) * 0.99 / den;
    
        num1 = 2 * Math.sin(this.p1.a - this.p2.a);
        num2 = this.p1.v * this.p1.v * this.r1 * (this.p1.m + this.p2.m);
        num3 = this.g * (this.p1.m + this.p2.m) * Math.cos(this.p1.a);
        num4 = this.p2.v * this.p2.v * this.r2 * this.p2.m;
        num4 *= Math.cos(this.p1.a - this.p2.a);
        den = 2 * this.p1.m + this.p2.m;
        den -= this.p2.m * Math.cos(2 * this.p1.a - 2 * this.p2.a)
        den *= this.r2;
        let a2_a = (num1 * (num2 + num3 + num4)) * 0.99 / den;
    
        this.p1.x = this.r1 * Math.sin(this.p1.a) + this.canvas.width/2;
        this.p1.y = this.r1 * Math.cos(this.p1.a) + this.canvas.height/3;
    
        this.p2.x = this.p1.x + this.r2 * Math.sin(this.p2.a);
        this.p2.y = this.p1.y + this.r2 * Math.cos(this.p2.a);
    
        this.p1.v += a1_a;
        this.p2.v += a2_a;
    
        this.p1.a += this.p1.v;
        this.p2.a += this.p2.v;
    }

    init_double_pendulum()
    {
        this.ctx.fillStyle = "#F58682"
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

        this.calculDeplacements();
        this.ctx.beginPath();
        this.ctx.moveTo(this.p2.x, this.p2.y);
        this.ctx.lineTo(this.p1.x, this.p1.y);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.p1.x, this.p1.y);
        this.ctx.lineTo(this.canvas.width/2, this.canvas.height/3);
        this.ctx.closePath();
        this.ctx.stroke();

        this.drawParticle(this.p1);
        this.drawParticle(this.p2);
    }
}

function d_pendule_animer(d_pendulum)
{
    if(d_pendulum.isAnimated)
    {
        clearInterval(d_pendulum.intervalID);
        d_pendulum.isAnimated = false;
    }
    else
    {
        d_pendulum.isAnimated = true;
        for(let i = 0; i < 200; i++)
        {
            d_pendulum.drawnPoints.push([d_pendulum.p2.x, d_pendulum.p2.y]);
        }
        d_pendulum.intervalID = setInterval(function(){
            d_pendulum.calculDeplacements();
    
            d_pendulum.ctx.fillStyle = "#F58682"
            d_pendulum.ctx.fillRect(0,
                                    0,
                                    d_pendulum.canvas.width, 
                                    d_pendulum.canvas.height);
    
            for(let i = 0; i < d_pendulum.drawnPoints.length; i++)
            {
                d_pendulum.ctx.beginPath();
                d_pendulum.ctx.arc(d_pendulum.drawnPoints[i][0], 
                                   d_pendulum.drawnPoints[i][1], 
                                   1, 
                                   0, 
                                   Math.PI * 2, 
                                   true); 
                d_pendulum.ctx.stroke();
            }
            d_pendulum.ctx.beginPath();
            d_pendulum.ctx.moveTo(d_pendulum.p2.x, d_pendulum.p2.y);
            d_pendulum.ctx.lineTo(d_pendulum.p1.x, d_pendulum.p1.y);
            d_pendulum.ctx.closePath();
            d_pendulum.ctx.stroke();
    
            d_pendulum.ctx.beginPath();
            d_pendulum.ctx.moveTo(d_pendulum.p1.x, d_pendulum.p1.y);
            d_pendulum.ctx.lineTo(d_pendulum.canvas.width/2, 
                                  d_pendulum.canvas.height/3);
            d_pendulum.ctx.closePath();
            d_pendulum.ctx.stroke();
    
            d_pendulum.drawParticle(d_pendulum.p1);
            d_pendulum.drawParticle(d_pendulum.p2);
    
            d_pendulum.drawnPoints.push([d_pendulum.p2.x, d_pendulum.p2.y]);
            d_pendule.drawnPoints.splice(0, 1);
        }, 15);
    }
}

function d_pendule_reset(d_pendule)
{
    d_pendule.drawnPoints.splice(0, d_pendule.drawnPoints.length);
    clearInterval(d_pendule.intervalID);
    d_pendule.isAnimated = false;
    d_pendule.p1 = new Pendule(0, 0, d_pendule.canvas.height/10, "#7BA86A");
    d_pendule.p2 = new Pendule(0, 0, d_pendule.canvas.height/10, "#48A8A0");

    d_pendule.init_double_pendulum();
}


// Sorting algorithm
class QSortArray{
    constructor(canvas, context, size)
    {
        this.size = size;
        this.array = this.init_array();

        this.canvas = canvas;
        this.context = context;

        this.value_width = this.canvas.width/this.size;

        this.draw_all_value();
    }

    init_array()
    {
        let res = [];
        for(let i = 0; i < this.size; i++)
        {
            res[i] = Math.random();
        }
        return res;
    }

    async parti(p, r)
    { 
        let x = this.array[r];
        let i = p - 1;
        
        for(let j = p; j < r; j++)
        {
            if(this.array[j] <= x)
            {
                i += 1;

                let tmp1 = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = tmp1;

                this.draw_all_value();
                this.drawPivot(r);

                await sleep(15);
            }
        }
        let tmp2 = this.array[i + 1];
        this.array[i + 1] = this.array[r];
        this.array[r] = tmp2;

        this.draw_all_value();
        this.drawPivot(r);

        return (i + 1);
    }

    async quick_sort(p, r)
    {
        if(p < r)
        {
            let q = await this.parti(p, r);
            await this.quick_sort(p, q-1);
            await this.quick_sort(q+1, r);
        }
    }

    drawPivot(index)
    {
        this.context.fillStyle = "#01C901AA";
        this.context.fillRect(index * this.value_width, 
                                this.canvas.height - (this.array[index] * this.canvas.height),
                                this.value_width, 
                                this.canvas.height
                                );
    }

    draw_value(index)
    {
        this.context.fillStyle = "#010101AA";
        this.context.fillRect(index * this.value_width, 
                                this.canvas.height - (this.array[index] * this.canvas.height),
                                this.value_width, 
                                this.canvas.height
                                );
    }

    draw_all_value()
    {   
        this.context.fillStyle = "#F58682";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for(let i = 0; i < this.size; i++)
        {
            this.draw_value(i);
        }
    }
}


// Code animation orbite de planetes
// Rédigé par Kévin Hentz et Florent Hardy
// étudiants à l'UFR de Mathématique et d'Informatique

// Retourne un entier compris dans [min;max[
const genereNombre = (min, max) => {
    return Math.floor((Math.random()*(max-min))+min)
}
    
// Génère une couleur hexa aléatoirement.   
// Snippet récupéré sur https://stackoverflow.com/a/1484514
const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
    return color;
}



let compteur = 0;   // Cette variable sera utilisé pour savoir si le clique permet d'ouvrir (si compteur=0) ou de fermer (si compteur=1) le menu
    
function Menu(){    // Cette fonction sera exécuté  à chaque fois que quelqu'un clique sur l'élément portant "onclick="Menu()" et elle permettra d'ouvrir et de fermer le menu
    if (compteur === 0) {
        openFunction();
        compteur=1;             
    }
    else {
        closeFunction();
        compteur=0;
    }
} 

class Particule{
    constructor(x, y, m)
    {
        //x et y sont la position, m la masse
        this.x = x;
        this.y = y;
        this.m = m;
    
        //x velocity et y velocity
        this.xv = 0;
        this.yv = 0;
    
        //x force et y force
        this.xf = 0;
        this.yf = 0;

        //booleen mobile = True, immobile = False
        //servira lors de l'initialisation de la particule centrale immobile
        this.mobile = true;
    
        //couleur
        this.color = getRandomColor();
    
        //relation masse/rayon arbitraire ici rayon = ln(m * 2pi²)
        this.rad = Math.log(m * 2 * Math.PI**2);
    }
    
    //affichage de la particule
    draw()
    {
        orbit_context.beginPath();
        orbit_context.fillStyle = this.color
        orbit_context.arc(this.x, this.y, this.rad, 0, Math.PI*2, true);
        orbit_context.closePath();
        orbit_context.fill();
    };
}  

    
function calculDeplacements(tab)
{
    //dt la différentielle du temps, G la constante gravitationnelle de Newton
    let dt = 0.2, G = 10;
    for(i = 0; i < tab.length; i++){
    
        //Test si particule.mobile est True
        if (!(tab[i].mobile)){
            continue;
        }
    
        //Non considération des particules 100pixels au delà du canevas
        if
        ( 
            (tab[i].x < -100 || tab[i].x > orbit_canvas.width + 100) || 
            (tab[i].y < -100 || tab[i].y > orbit_canvas.height + 100)
        )
        {
            continue;
        }
    
        //Mise à zéro des forces avant de les (re)calculer
        tab[i].xf = 0;
        tab[i].yf = 0;
    
        // Calcul de la force appliquée à i par toutes les autres particules j
        for (j = 0; j < tab.length; j++){
            if (i == j){
                continue;
            }
    
            //dx et dy respectivement distance horizontale et distance verticale des 2 points
            let dx = tab[j].x - tab[i].x;
            let dy = tab[j].y - tab[i].y;
    
            //r la distance p_i -> p_j, f la force selon Newton
            let r = Math.sqrt((dx*dx) + (dy*dy));
            let f = (G * tab[j].m) / (r*r);
    
            //Application de la force
            tab[i].xf += (f * dx) / r;
            tab[i].yf += (f * dy) / r;
        }
    
        // Calcul de la nouvelle position de la particule i avec la méthode d'Euler 
        //Attribution de l'accélération horizontale puis verticale
        let a_x = tab[i].xf / tab[i].m;
        let a_y = tab[i].yf / tab[i].m;
    
        //Calcul de la vitesse 
        tab[i].xv += (a_x * dt);
        tab[i].yv += (a_y * dt);
    
        //Calcul de la position/trajectoire 
        tab[i].x += (tab[i].xv * dt);
        tab[i].y += (tab[i].yv * dt);
    }
}

//Animation
//Code donné par le sujet
let intervalID, bool_animation = true;
    
//tab_p se trouve dans le fichier html et est la liste des particules initialisées
function animer(){
    intervalID = setInterval(function(){
        calculDeplacements(tab_p);
    
        orbit_context.fillStyle = "#000000DD"
        orbit_context.fillRect(0,0,orbit_canvas.width, orbit_canvas.height);
    
        for (let p = 0; p < tab_p.length; p++){
            tab_p[p].draw();
        }
    }, 10); // code exécuté toutes les 10 ms
}

    
//Correction d'un bug avec lequel il était possible de lancer plusieurs fois la simulation
//rendant par la même occasion le bouton stop inutilisable
function start(){
    if (bool_animation){
        bool_animation = false;
        animer();
    }
}
    
function stop(){
    clearInterval(intervalID);
    bool_animation = true;
}


// Double pendulum var
let pendule_canvas, d_pendule;

// Sorting var
let sort_array, sort_canvas;

// Orbit var
let orbit_canvas, orbit_context, tab_p = [];

document.addEventListener("DOMContentLoaded", function() {
    // Init duck petting
    document.querySelectorAll("img")[0].addEventListener("click", pet_duck);

    // Init double pendule
    pendule_canvas = document.querySelectorAll(".anim canvas")[0];
    pendule_ctx = pendule_canvas.getContext("2d");
    pendule_canvas.width = 0.95 * window.innerWidth;
    pendule_canvas.height = 0.8 * window.innerHeight;
    d_pendule = new DoublePendulum(pendule_canvas, pendule_ctx);
    d_pendule.init_double_pendulum();

    document.querySelectorAll(".anim .controles")[0]
            .querySelectorAll("button")[0]
            .addEventListener("click", () => {
                d_pendule_animer(d_pendule);
            });

    document.querySelectorAll(".anim .controles")[0]
            .querySelectorAll("button")[1]
            .addEventListener("click", () => {
                d_pendule_reset(d_pendule);
            });

    // Init quicksort algortihm
    sort_canvas = document.querySelectorAll(".anim canvas")[1];
    sort_ctx = sort_canvas.getContext("2d");
    sort_canvas.width = 0.8 * window.innerWidth;
    sort_canvas.height = 0.8 * window.innerHeight;
    sort_array = new QSortArray(sort_canvas, sort_ctx, 300);

    document.querySelectorAll(".anim .controles")[1]
            .querySelectorAll("button")[0]
            .addEventListener("click", () => {
                sort_array.quick_sort(0, sort_array.size - 1);
            });

    document.querySelectorAll(".anim .controles")[1]
            .querySelectorAll("button")[1]
            .addEventListener("click", () => {
                sort_array = null;
                sort_array = new QSortArray(sort_canvas, sort_ctx, 300);
            });

    // Init orbit simulation
    orbit_canvas = document.querySelectorAll(".anim canvas")[2];
    orbit_context = orbit_canvas.getContext("2d");
    orbit_canvas.width = 0.8 * window.innerWidth;
    orbit_canvas.height = 0.8 * window.innerHeight;
    orbit_canvas.style.backgroundColor = "#000000"

    //N le nombre de particules créées au lancement de la page
    //tab_p le tableau contenant les points
    let N = 15;
    for (let i = 0; i < N; i++) {
        //Code donné par le sujet, initialisation de N points
        let m = genereNombre(50,1000), rad = 0.0, ang = ((2*Math.PI*i) / N);
        if (m < 50) {
            rad = genereNombre(50,100);
        } else {
            rad = genereNombre(100,200);
        }
        let x = orbit_canvas.width/2 + rad*Math.sin(ang);
        let y = orbit_canvas.height/2 + rad*Math.cos(ang);
        //Definition de la classe Particule dans le fichier js
        let p = new Particule(x, y, m); 
        //Vitesse initialle des points 
        p.xv = Math.random()/100*rad*Math.cos(ang);
        p.yv = Math.random()/100*rad*Math.sin(ang);
        
        //Affichage des points
        p.draw();
        //La method "push" ajoute p à la fin de tab_p
        tab_p.push(p);
    }

    //Initialisation et affichage du point central
    let p_centre = new Particule(orbit_canvas.width/2, orbit_canvas.height/2, 10000);
    p_centre.rad = 17;
    p_centre.mobile = false;
    p_centre.draw();

    //Ajout du point central à la liste
    tab_p.push(p_centre);

    document.querySelectorAll(".anim .controles")[2]
    .querySelectorAll("button")[0]
    .addEventListener("click", () => {
        start();
    });

    document.querySelectorAll(".anim .controles")[2]
    .querySelectorAll("button")[1]
    .addEventListener("click", () => {
        stop();
    });
});

 


