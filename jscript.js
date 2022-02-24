

// Pet the duck !!!
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function pet_duck()
{
    var duck = document.getElementById("duck"); 
    var duck_width = duck.width;
    var duck_height = duck.height;

    duck.src = "img/pet_duck.gif";
    // gif créé à l'aide de l'outil https://benisland.neocities.org/petpet/
    // développé par Ben Island

    duck.width = duck_width;
    duck.height = duck_height;

    await sleep(1000);

    duck.src = "img/duck.png";
}

// Sliding carousel
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

// Code minesweeper
class Minesweeper
{
    constructor(canvas, context)
    {
        this.canvas = canvas;
        this.context = context;
        this.NB_LIGNES = 9;
        this.SPACE_INBETWEEN = 3
        this.SQUARESIZE = Math.floor(mine_sw_canvas.width / this.NB_LIGNES);
        this.IS_FIRST_DISCOVER = true;
        this.TOTAL_NB_BOMBS;
        this.uncovered = [];
        this.bombs_and_digits = [];
        this.uncovered_zeros = [];
        this.flagged = [];
        this.accessibility;
        this.selected = [-1, -1];
        this.canvas.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
    }

    point_in_array(x, y, array)
    {
        for(let k = 0; k < array.length; k++)
        {
            if( (array[k][0] == x) && (array[k][1] == y) )
            {
                return true;
            }
        }
        return false;
    }

    count_total_nb_bombs()
    {
        let count = 0;
        for(let i = 0; i < this.NB_LIGNES; i++)
        {
            for(let ii = 0; ii < this.NB_LIGNES; ii++)
            {
                if(this.bombs_and_digits[i][ii] == "9")
                {
                    count++;
                }
            }
        }
        return count;
    }

    // Renvoie le nombre de bombes entourant la case (x, y)
    count_bombs(x, y)
    {
        let count = 0;
        for(let j = -1; j < 2; j++)
        {
            if( ((x + j) < 0) || ((x + j) > this.NB_LIGNES - 1) )
            {
                continue;
            }
            for(let jj = -1; jj < 2; jj++)
            {
                if( ((y + jj) < 0) || ((y + jj) > this.NB_LIGNES - 1) )
                {
                    continue;
                } 
                else if (this.bombs_and_digits[x+j][y+jj] === "9")
                {
                    count++;
                }
            }
        }
        return count;
    }

    // Crée une grille
    create_board()
    {
        for(let i = 0; i < this.NB_LIGNES; i++)
        {
            let tmp_txt = "";
            for(let ii = 0; ii < this.NB_LIGNES; ii++)
            {
                let rando = Math.random();
                if(rando > 0.2){
                    tmp_txt += "A";
                } 
                else 
                {
                    tmp_txt += "9";
                }
            }
            this.bombs_and_digits.push(tmp_txt);
        }
    
        for(let i = 0; i < this.NB_LIGNES; i++)
        {
            let tmp_txt = "";
            for(let ii = 0; ii < this.NB_LIGNES; ii++)
            {
                if(this.bombs_and_digits[i][ii] === "A")
                {
                    let count = this.count_bombs(i, ii);
                    tmp_txt += count;
                } 
                else 
                {
                    tmp_txt += "9";
                }
            }
        this.bombs_and_digits[i] = tmp_txt;
        }
        this.TOTAL_NB_BOMBS = this.count_total_nb_bombs()
    }

    // Découvre une case
    uncover(x, y)
    {
        if(this.point_in_array(x, y, this.uncovered))
        {
            return;
        }

        if(this.point_in_array(x, y, this.flagged))
        {
            return;
        }
        
        this.uncovered.push([x, y]);
        this.context.clearRect(x * this.SQUARESIZE - 3, 
                               y * this.SQUARESIZE - 3, 
                               this.SQUARESIZE + 3, 
                               this.SQUARESIZE + 3
                               );
    
        if
        ( 
            (this.bombs_and_digits[x][y] !== "9") && 
            (this.bombs_and_digits[x][y] !== "0")
        )
        {
            this.context.fillText(this.bombs_and_digits[x][y], 
                                  ((x + 0.3) * this.SQUARESIZE), 
                                  ((y + 0.7) * this.SQUARESIZE)
                                  );
        } 
        else if(this.bombs_and_digits[x][y] == "9"){
            let tmp_img = document.getElementById("Explosion.png");
            this.context.drawImage(tmp_img, 
                                   x * this.SQUARESIZE, 
                                   y * this.SQUARESIZE, 
                                   this.SQUARESIZE, 
                                   this.SQUARESIZE
                                   );
        }
    }

    uncover_all()
    {
        for(let i = 0; i < this.NB_LIGNES; i++)
        {
            for(let ii = 0; ii < this.NB_LIGNES; ii++)
            {
                if( !(this.point_in_array(i, ii, this.flagged)) )
                {
                    this.uncover(i, ii);
                }
            }
        }
    
        for(let i = 0; i < this.flagged.length; i++)
        {
            if
            (
                (this.bombs_and_digits
                    [this.flagged[i][0]]
                    [this.flagged[i][1]]
                 !== "9"
                )
            )
            {
                this.context.fillStyle = "#d1342fcc";
                this.context.fillRect(this.flagged[i][0] * this.SQUARESIZE + 1, 
                                      this.flagged[i][1] * this.SQUARESIZE + 1,
                                      this.SQUARESIZE - this.SPACE_INBETWEEN, 
                                      this.SQUARESIZE - this.SPACE_INBETWEEN
                                      );
    
                let tmp_img = document.getElementById("Flag.png");
                this.context.drawImage(tmp_img, 
                                       this.flagged[i][0] * this.SQUARESIZE, 
                                       this.flagged[i][1] * this.SQUARESIZE, 
                                       this.SQUARESIZE, 
                                       this.SQUARESIZE
                                       );
            } else {
                this.context.fillStyle = "#00990099";
                this.context.fillRect(this.flagged[i][0] * this.SQUARESIZE + 1, 
                                      this.flagged[i][1] * this.SQUARESIZE + 1,
                                      this.SQUARESIZE - this.SPACE_INBETWEEN, 
                                      this.SQUARESIZE - this.SPACE_INBETWEEN
                                      );
    
                let tmp_img = document.getElementById("Flag.png");
                this.context.drawImage(tmp_img, 
                                       this.flagged[i][0] * this.SQUARESIZE, 
                                       this.flagged[i][1] * this.SQUARESIZE, 
                                       this.SQUARESIZE, this.SQUARESIZE
                                       );
            }
        }
    }

    // Découvre toutes les cases voisinnes
    // qui ne sont pas à proximité d'une mine
    uncover_zeros(i, ii){
        for(let j = -1; j < 2; j++){
            if( ((i + j) < 0) || ((i + j) > this.NB_LIGNES - 1) )
            {
                continue;
            }
            for(let jj = -1; jj < 2; jj++){
                if( ((ii + jj) < 0) || ((ii + jj) > this.NB_LIGNES - 1) )
                {
                    continue;
                } else if (this.bombs_and_digits[i+j][ii+jj] == 0)
                {
                    this.uncover(i + j, ii + jj);
    
                    if
                    (
                        !(this.point_in_array(i + j, 
                                              ii + jj, 
                                              this.uncovered_zeros)
                         )
                    )
                    {
                        this.uncovered_zeros.push([i + j, ii + jj]);
                        this.uncover_zeros(i + j, ii + jj);
                    }
                }
            }
        }
    }

    // Découvre les premières cases voisinnant une mine
    uncover_near_zeros(){
        for(let i = 0; i < this.uncovered_zeros.length; i++){
            for(let j = -1; j < 2; j++){
                if
                ( 
                    ((this.uncovered_zeros[i][0] + j) < 0) || 
                    ((this.uncovered_zeros[i][0] + j) > this.NB_LIGNES - 1) 
                )
                {
                    continue;
                }
                for(let jj = -1; jj < 2; jj++){
                    if
                    ( 
                        ((this.uncovered_zeros[i][1] + jj) < 0) || 
                        ((this.uncovered_zeros[i][1] + jj) > this.NB_LIGNES-1)
                    )
                    {
                        continue;
                    } 
                    else 
                    {
                        this.uncover(this.uncovered_zeros[i][0] + j, 
                                     this.uncovered_zeros[i][1] + jj);
                    }
                }
            }
        }
    }

    l_click(mouseX_ratio, mouseY_ratio)
    {   
        if
        (
            this.point_in_array(this.selected[0], 
                                this.selected[1], 
                                this.flagged
                                )
        )
        {

            let tmp_img = document.getElementById("Flag.png");
            this.context.clearRect(this.selected[0] * this.SQUARESIZE - 3, 
                                    this.selected[1] * this.SQUARESIZE - 3, 
                                    this.SQUARESIZE + 3, 
                                    this.SQUARESIZE + 3
                                    );

            this.context.fillRect(this.selected[0] * this.SQUARESIZE, 
                                    this.selected[1] * this.SQUARESIZE,
                                    this.SQUARESIZE - this.SPACE_INBETWEEN, 
                                    this.SQUARESIZE - this.SPACE_INBETWEEN
                                    );
    
            this.context.drawImage(tmp_img, 
                                    this.selected[0] * this.SQUARESIZE, 
                                    this.selected[1] * this.SQUARESIZE, 
                                    this.SQUARESIZE - 3, 
                                    this.SQUARESIZE - 3
                                    );
            return;
        }

        this.selected = [-1, -1];

        if(this.IS_FIRST_DISCOVER)
        {
            while(this.bombs_and_digits[mouseX_ratio][mouseY_ratio] == "9")
            {
                this.bombs_and_digits = [];
                this.create_board();
            }
            this.IS_FIRST_DISCOVER = false;
        }
        

        if(this.bombs_and_digits[mouseX_ratio][mouseY_ratio] == "9")
        {
            this.uncover_all();
        } else if(this.bombs_and_digits[mouseX_ratio][mouseY_ratio] == 0){
            this.uncovered_zeros = [[mouseX_ratio, mouseY_ratio]];
            this.uncover_zeros(mouseX_ratio, mouseY_ratio);
            this.uncover_near_zeros();
        } else {
            this.uncover(mouseX_ratio, mouseY_ratio);
        }    

        if(this.TOTAL_NB_BOMBS == (this.NB_LIGNES**2 - this.uncovered.length))
        {
            this.uncover_all();
            // Victoire !!
        }
    }

    r_click(mouseX_ratio, mouseY_ratio)
    {
        this.context.clearRect(this.selected[0] * this.SQUARESIZE - 3, 
                                this.selected[1] * this.SQUARESIZE - 3, 
                                this.SQUARESIZE + 3, 
                                this.SQUARESIZE + 3
                                );
        this.selected = [-1, -1];

        if(this.point_in_array(mouseX_ratio, mouseY_ratio, this.flagged))
        {
            this.context.fillRect(mouseX_ratio * this.SQUARESIZE, 
                                  mouseY_ratio * this.SQUARESIZE,
                                  this.SQUARESIZE - this.SPACE_INBETWEEN, 
                                  this.SQUARESIZE - this.SPACE_INBETWEEN
                                  );

            let splice_index = -1;
            for(let k = 0; k < this.flagged.length; k++)
            {
                if
                ( 
                    (this.flagged[k][0] == mouseX_ratio) && 
                    (this.flagged[k][1] == mouseY_ratio) 
                )
                {
                    splice_index = k;
                }
            }
            this.flagged.splice(splice_index,1);
        } 
        else if
        (
            this.point_in_array(mouseX_ratio, mouseY_ratio, this.uncovered)
        )
        {
            return;
        } 
        else 
        {
            let tmp_img = document.getElementById("Flag.png");

            this.context.fillRect(mouseX_ratio * this.SQUARESIZE, 
                                    mouseY_ratio * this.SQUARESIZE,
                                    this.SQUARESIZE - this.SPACE_INBETWEEN, 
                                    this.SQUARESIZE - this.SPACE_INBETWEEN
                                    );

            this.context.drawImage(tmp_img, 
                                   mouseX_ratio * this.SQUARESIZE, 
                                   mouseY_ratio * this.SQUARESIZE, 
                                   this.SQUARESIZE - 3, 
                                   this.SQUARESIZE - 3
                                   );

            this.flagged.push([mouseX_ratio, mouseY_ratio]);
        }
    }

    select(mouseX_ratio, mouseY_ratio)
    {   
        if(this.point_in_array(mouseX_ratio, mouseY_ratio, this.uncovered))
        {
            this.selected = [-1, -1]
            return;
        }
        if(!(this.selected[0] < 0) )
        {
            this.context.clearRect(this.selected[0] * this.SQUARESIZE - 3, 
                                   this.selected[1] * this.SQUARESIZE - 3, 
                                   this.SQUARESIZE + 3, 
                                   this.SQUARESIZE + 3
                                   );
            this.context.fillRect(this.selected[0] * this.SQUARESIZE + 1, 
                                  this.selected[1] * this.SQUARESIZE + 1,
                                  this.SQUARESIZE - this.SPACE_INBETWEEN, 
                                  this.SQUARESIZE - this.SPACE_INBETWEEN
                                  );

            if
            (this.point_in_array
                (
                this.selected[0], 
                this.selected[1], 
                this.flagged
                )
            )
            {
                let tmp_img = document.getElementById("Flag.png");
                this.context.drawImage(tmp_img, 
                                        this.selected[0] * this.SQUARESIZE, 
                                        this.selected[1] * this.SQUARESIZE, 
                                        this.SQUARESIZE - 3, 
                                        this.SQUARESIZE - 3
                                        );
            }
        }
        

        this.selected = [mouseX_ratio, mouseY_ratio];
        this.context.strokeStyle = "green";
        this.context.lineWidth = "3"
        this.context.strokeRect(mouseX_ratio * this.SQUARESIZE, 
                                mouseY_ratio * this.SQUARESIZE, 
                                this.SQUARESIZE - 3, 
                                this.SQUARESIZE - 3,
                                );
    }

    // Initialise les interractions possibles avec la grille
    init_board()
    {
        this.canvas.addEventListener("mousedown", (event) => {
            let mouseX = event.offsetX - (event.offsetX % this.SQUARESIZE);
            let mouseY = event.offsetY - (event.offsetY % this.SQUARESIZE);
        
            let mouseX_ratio = mouseX / this.SQUARESIZE;
            let mouseY_ratio = mouseY / this.SQUARESIZE;

            if(event.button == 0)
            {
                if(this.accessibility)
                {
                    this.select(mouseX_ratio, mouseY_ratio);
                }
                else
                {
                    this.l_click(mouseX_ratio, mouseY_ratio);
                }
            }

            if(event.button == 2)
            {
                if(this.accessibility)
                {
                    return;
                }
                else
                {
                    this.r_click(mouseX_ratio, mouseY_ratio);
                }
            }
        });

        for(let i = 0; i < this.NB_LIGNES; i++)
        {
            for(let ii = 0; ii < this.NB_LIGNES; ii++)
            {
                this.context.fillRect(i * this.SQUARESIZE + 1, 
                                      ii * this.SQUARESIZE + 1,
                                      this.SQUARESIZE - this.SPACE_INBETWEEN, 
                                      this.SQUARESIZE - this.SPACE_INBETWEEN
                                      );
            }
        }

        this.create_board();
    }
}


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
        var res = [];
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



// Minesweeper var
var mine_sw_canvas, mine_sw_min_size, mine_sw, minesw_access;

// Double pendulum var
var pendule_canvas, d_pendule;

// Sorting var
var sort_array = [];

document.addEventListener("DOMContentLoaded", function() {
    // Init duck petting
    document.getElementById("duck").addEventListener("click", pet_duck);

    // Init carouser sliders
    document.querySelectorAll(".slide").forEach(e => new CarouselSlider(e));

    // Init minesweeper
    mine_sw_canvas = document.getElementById("affichage_mine");
    mine_sw_min_size = (window.innerWidth < window.innerHeight)? 
                            window.innerWidth: window.innerHeight;
    mine_sw_canvas.width = 0.7 * mine_sw_min_size;
    mine_sw_canvas.height = mine_sw_canvas.width ;
    
    let font_size = Math.floor(mine_sw_min_size / 20);

    mine_sw_ctx = mine_sw_canvas.getContext("2d");
    mine_sw_ctx.font = "" + font_size + "px Arial";
    mine_sw_ctx.fillStyle = "#c18bdb";

    mine_sw = new Minesweeper(mine_sw_canvas, mine_sw_ctx);
    mine_sw.init_board();

    minesw_access = document.getElementById("minesw_access");
    if(minesw_access.checked)
    {
        document.getElementById("minesw_access_ctrls").style.display = "block";
        mine_sw.accessibility = true;
    }
    else
    {
        mine_sw.accessibility = false;
    }
    minesw_access.addEventListener("click", function(){
        let tmp = document.getElementById("minesw_access_ctrls");
        if(!(minesw_access.checked) )
        {
            tmp.style.display = "none";
            mine_sw.accessibility = false;
        }
        else
        {
            tmp.style.display = "block"
            mine_sw.accessibility = true;
        }
    });

    // Init double pendule
    pendule_canvas = document.getElementById("affichage_pendule");
    pendule_ctx = pendule_canvas.getContext("2d");
    pendule_canvas.width = 0.95 * window.innerWidth;
    pendule_canvas.height = 0.8 * window.innerHeight;
    d_pendule = new DoublePendulum(pendule_canvas, pendule_ctx);
    d_pendule.init_double_pendulum();

    // Init quicksort algortihm
    sort_canvas = document.getElementById("affichage_sort");
    sort_ctx = sort_canvas.getContext("2d");
    sort_canvas.width = 0.8 * window.innerWidth;
    sort_canvas.height = 0.8 * window.innerHeight;
    sort_array = new QSortArray(sort_canvas, sort_ctx, 300);

});


///////////////////////////////////////////////////////////////////////////////

// Code à modifier, provient d'un précédent projet

// Code present dans le html

//N le nombre de particules créées au lancement de la page
            //tab_p le tableau contenant les points
            var N = 10, tab_p = new Array();
 
            for (var i = 0; i < N; i++) {
                //Code donné par le sujet, initialisation de N points
                var m = genereNombre(10,100), rad = 0.0, ang = ((2*Math.PI*i) / N);
 
                if (m < 50) {
                    rad = genereNombre(50,100);
                } else {
                    rad = genereNombre(100,200);
                }
 
                var x = $("#affichage").attr("width")/2 + rad*Math.sin(ang);
                var y = $("#affichage").attr("height")/2 + rad*Math.cos(ang);
 
                //Definition de la classe Particule dans le fichier js
                var p = new Particule(x, y, m); 
 
                //Vitesse initialle des points 
                p.xv = -0.01*rad*Math.cos(ang);
                p.yv = 0.01*rad*Math.sin(ang);
                
                //Affichage des points
                p.draw();
 
                //La method "push" ajoute p à la fin de tab_p
                tab_p.push(p);
            }
 
            //Initialisation et affichage du point central
            var p_centre = new Particule($("#affichage").attr("width")/2, $("#affichage").attr("height")/2, 3000);
            p_centre.rad = 17;
            p_centre.mobile = false;
            p_centre.draw();
 
            //Ajout du point central à la liste
            tab_p.push(p_centre);


// Code present dans le fichier js


// Accès au canvas défini dans la structure HTML
var canvas = $("#affichage")[0]; // get the actual DOM element
var ctx = canvas.getContext("2d");
 
// à noter: "#affichage" était auparavant "#nbody"
 
// Retourne un entier compris dans [min;max[
function genereNombre(min, max){
 return Math.floor((Math.random()*(max-min))+min)
}
 
 
// Génère une couleur hexa aléatoirement.   
// Snippet récupéré sur https://stackoverflow.com/a/1484514
function getRandomColor() {
 let letters = '0123456789ABCDEF';
 let color = '#';
 for (let i = 0; i < 6; i++)
 color += letters[Math.floor(Math.random() * 16)];
 return color;
}
 
// Code que j’ai réussi à faire (pour le menu)
var compteur = 0;               // Cette variable sera utilisé pour savoir si le clique permet d'ouvrir (si compteur=0) ou de fermer (si compteur=1) le menu
 
function Menu(){                // Cette fonction sera exécuté  à chaque fois que quelqu'un clique sur l'élément portant "onclick="Menu()" et elle permettra d'ouvrir et de fermer le menu
    if (compteur === 0) {
        openFunction();
        compteur=1;             
    }
    else {
        closeFunction();
        compteur=0;
    }
} 
 
function openFunction(){
    document.getElementById("menu").style.height = "200px";
    // La ligne ci-dessus permet de modifier la hauteur (initialement =0px) du menu afin qu'il "s'ouvre"
    document.getElementById("mainbox").innerHTML="<h3> &#8593; Fermer les contrôles </h3>";
    // Le texte sur lequel l'utilisateur doit cliquer pour ouvrir le menu change grâce à cette ligne
}
 
function closeFunction(){
    document.getElementById("menu").style.height = "0px";
    // La ligne ci-dessus permet de modifier la hauteur du menu afin qu'il se "referme" (la valeur était passé à 200px suite au premier clique cf. function openFunction)
    document.getElementById("mainbox").innerHTML="<h3> &#8595; Afficher les contrôles </h3>";
    // Le texte sur lequel l'utilisateur doit cliquer pour fermer le menu change grâce à cette ligne
}
 
 
// Code canvas
function Particule(x, y, m){
 
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
 
    //affichage de la particule
    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    };
}  
 
// Code pour le slider présent dans le menu
 
var slider = document.getElementById("myRange");
var output = document.getElementById("value");
 
// Afficher la valeur du slider
output.innerHTML = slider.value;
 
slider.oninput = function(){
    output.innerHTML = this.value;
}
 
$(slider).bind('mousemove click', function() {
    // Si la souris se déplace sur le slider ou si l'utilisateur clique à un endroit sur le slider, la couleur est actualisée
    // (une couleur jusqu'à la valeur du slider / une autre couleur pour le reste)
    var sliderX = (slider.value*100)/500;
    var sliderColor = 'linear-gradient(90deg, rgb(193, 117, 252)' + sliderX + '%, rgb(214,214,214)' + sliderX + '%)';
    slider.style.background = sliderColor;
});
 
// Fin du code du slider
 
//Ajout d'un point par doubleclick
$('#zone').dblclick(function(event){
    mouseX = event.pageX - $('#affichage').offset().left;
    mouseY = event.pageY - $('#affichage').offset().top;
 
    var p_add = new Particule(mouseX, mouseY, slider.value);   // le dernier paramètre est la masse (output) du slider html
    p_add.color = document.getElementById("myColor").value;
    p_add.draw();
 
    //Ajout du point à la liste
    tab_p.push(p_add);
});
 
/* Algorithme pour la fonction calculDeplacements(particules, dt)
* ------------------------------------------------- */
 
//dt la différentielle du temps, G la constante gravitationnelle de Newton
var dt = 0.2, G = 1;
 
function calculDeplacements(tab, dt){
    for(i = 0; i < tab.length; i++){
 
        //Test si particule.mobile est True
        if (!(tab[i].mobile)){
            continue;
        }
 
        //Non considération des particules 100pixels au delà du canevas
        if (tab[i].x < -100 || tab[i].x > (document.getElementById("affichage").width + 100)
        || tab[i].y < -100 || tab[i].y > (document.getElementById("affichage").height + 100)){
            continue;
        }
 
        //Mise à zéro des forces avant de les (re)calculer
        tab[i].xf = 0;
        tab[i].yf = 0;
 
        /* Calcul de la force appliquée à i par toutes les autres particules j*/
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
 
        /* Calcul de la nouvelle position de la particule i avec la méthode d'Euler */
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
var intervalID, bool_animation = true;
 
//tab_p se trouve dans le fichier html et est la liste des particules initialisées
function animer(){
    intervalID = setInterval(function(){
        calculDeplacements(tab_p, dt);
 
        ctx.fillStyle = "#6495ed"
        ctx.fillRect(0,0,canvas.width, canvas.height);
 
        for (var p = 0; p < tab_p.length; p++){
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
