

// Pet the duck !!!
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pet_duck()
{
    var duck = document.getElementById("duck"); 
    var duck_width = duck.width;
    var duck_height = duck.height;

    console.log("here");

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
                        ((this.uncovered_zeros[i][1] + jj) > this.NB_LIGNES - 1)
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
        if(this.point_in_array(this.selected[0], this.selected[1], this.flagged))
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
        else if(this.point_in_array(mouseX_ratio, mouseY_ratio, this.uncovered))
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
                                      this.SQUARESIZE - this.SPACE_INBETWEEN);
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
        num4 += this.p1.v * this.p1.v * this.r1 * Math.cos(this.p1.a - this.p2.a);
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

        this.value_width = Math.floor(this.canvas.width/this.size);

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

    parti(p, r)
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
            }
        }
        let tmp2 = this.array[i + 1];
        this.array[i + 1] = this.array[r];
        this.array[r] = tmp2;

        return (i + 1);
    }

    quick_sort(p, r)
    {
        if(p < r)
        {
            let q = this.parti(this.array, p, r);
            this.quick_sort(this.array, p, q-1);
            this.quick_sort(this.array, q+1, r);
        }
    }



    draw_value(index)
    {
        this.context.fillStyle = "#76F5EA99";
        this.context.fillRect(index * this.value_width, 
                                this.canvas.height - (this.array[index] * this.canvas.height),
                                this.value_width, 
                                this.canvas.height
                                );
    }

    async draw_all_value()
    {   
        for(let i = 0; i < this.size; i++)
        {
            this.draw_value(i);
            await sleep(100);
            this.context.fillStyle = "#F58682";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}



// Minesweeper var
var mine_sw_canvas, mine_sw_min_size, mine_sw;

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
    
    let font_size = mine_sw_min_size / 20;

    mine_sw_ctx = mine_sw_canvas.getContext("2d");
    mine_sw_ctx.font = "" + font_size + "px Arial";
    mine_sw_ctx.fillStyle = "#c18bdb";

    mine_sw = new Minesweeper(mine_sw_canvas, mine_sw_ctx);
    mine_sw.init_board();

    // Init double pendule
    pendule_canvas = document.getElementById("affichage_pendule");
    pendule_ctx = pendule_canvas.getContext("2d");
    pendule_canvas.width = 0.95 * window.innerWidth;
    pendule_canvas.height = 0.8 * window.innerHeight;
    d_pendule = new DoublePendulum(pendule_canvas, pendule_ctx);
    d_pendule.init_double_pendulum();

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

    // Init quicksort algortihm
    sort_canvas = document.getElementById("affichage_sort");
    sort_ctx = sort_canvas.getContext("2d");
    sort_canvas.width = 0.8 * window.innerWidth;
    sort_canvas.height = 0.8 * window.innerHeight;
    sort_array = new QSortArray(sort_canvas, sort_ctx, 100);

});

