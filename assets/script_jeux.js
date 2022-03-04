import 
{
    pet_duck
} from "./funcs.js"

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
            let tmp_img = document.querySelectorAll(".jeux canvas.affichage_mine ~ img")[0];
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
    
                let tmp_img = document.querySelectorAll(".jeux canvas.affichage_mine ~ img")[1];
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
    
                let tmp_img = document.querySelectorAll(".jeux canvas.affichage_mine ~ img")[1];
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

            let tmp_img = document.querySelectorAll(".jeux canvas.affichage_mine ~ img")[1];
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

        if
        (
            this.point_in_array(mouseX_ratio, 
                                mouseY_ratio, 
                                this.flagged
                                )
        )
        {
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
            let tmp_img = document.querySelectorAll(".jeux canvas.affichage_mine ~ img")[1];

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
                
                let tmp_img = document.querySelectorAll(".jeux canvas.affichage_mine ~ img")[1];
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
        this.context.fillStyle = "#c18bdb";
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

const OFS = 5;

class GrilleMorpion
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.grille = this.init_grille();
        this.SQUARESIZE = this.canvas.width / 3;
    }

    init_grille()
    {
        return [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]; 
    }

    draw_cross(x, y)
    {
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;

        this.ctx.beginPath();
        this.ctx.moveTo(x * this.SQUARESIZE + OFS, y * this.SQUARESIZE + OFS);
        this.ctx.lineTo((x + 1) * this.SQUARESIZE - OFS, (y + 1) * this.SQUARESIZE - OFS);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo( (x + 1) * this.SQUARESIZE - OFS, y * this.SQUARESIZE + OFS);
        this.ctx.lineTo(x * this.SQUARESIZE + OFS, (y + 1) * this.SQUARESIZE - OFS);
        this.ctx.stroke();
    }

    draw_circle(x, y)
    {
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;

        this.ctx.beginPath();
        this.ctx.arc(x * this.SQUARESIZE + (this.SQUARESIZE / 2), 
                     y * this.SQUARESIZE + (this.SQUARESIZE / 2), 
                     this.SQUARESIZE/2 - OFS, 
                     0, 
                     2 * Math.PI);
        this.ctx.stroke();
    }

    draw_empty_grid()
    {
        for(let i = 1; i < 3; i++)
        {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.SQUARESIZE, 0);
            this.ctx.lineTo(i * this.SQUARESIZE, this.canvas.height);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.SQUARESIZE);
            this.ctx.lineTo(this.canvas.width, i * this.SQUARESIZE);
            this.ctx.stroke();
        }
    }

    draw_grille()
    {
        this.draw_empty_grid();

        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                switch (this.grille[i][j]) {
                    case 0:
                        this.draw_cross(i, j);
                        break;
                    case 1:
                        this.draw_circle(i, j);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    test_if_finished()
    {
        // row
        for(let i = 0; i < 3; i++)
        {
            if( (this.grille[i][0] == this.grille[i][1]) && (this.grille[i][0] == this.grille[i][2]))
            {
                return this.grille[i][0];
            }
        }
        // column
        for(let i = 0; i < 3; i++)
        {
            if( (this.grille[0][i] == this.grille[1][i]) && (this.grille[0][i] == this.grille[2][i]))
            {
                return this.grille[0][i];
            }
        }
        // diag
        if( (this.grille[0][0] == this.grille[1][1]) && (this.grille[1][1] == this.grille[2][2]))
        {
            return this.grille[0][0];
        }

        if( (this.grille[2][0] == this.grille[1][1]) && (this.grille[2][0] == this.grille[0][2]))
        {
            return this.grille[2][0];
        }

        return -1;
    }
}


// Minesweeper var
let mine_sw_canvas, mine_sw_min_size, mine_sw, minesw_access, mine_sw_ctx;

// Morpion var
let morpion, morpion_canvas;

document.addEventListener("DOMContentLoaded", function() {
    // Init duck petting
    document.querySelectorAll("img")[0].addEventListener("click", pet_duck);

    // Init minesweeper
    mine_sw_canvas = document.querySelector(".jeux canvas");
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

    minesw_access = document.querySelector(".jeux input");
    if(minesw_access.checked)
    {
        document.querySelectorAll(".jeux canvas.affichage_mine ~ .controles")[1]
                .style
                .display = "block";
        mine_sw.accessibility = true;
    }
    else
    {
        mine_sw.accessibility = false;
    }

    document.querySelectorAll(".jeux canvas.affichage_mine ~ .controles:last-of-type button")[0]
            .addEventListener("click", () => {
                mine_sw.l_click(mine_sw.selected[0], mine_sw.selected[1]);
            });

    document.querySelectorAll(".jeux canvas.affichage_mine ~ .controles:last-of-type button")[1]
            .addEventListener("click", () => {
                mine_sw.r_click(mine_sw.selected[0], mine_sw.selected[1]);
            });

    minesw_access.addEventListener("click", function(){
        let tmp = document.querySelectorAll(".jeux canvas.affichage_mine ~ .controles")[1];
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

    mine_sw_canvas.addEventListener("mousedown", (event) => {
        let mouseX = event.offsetX - (event.offsetX % mine_sw.SQUARESIZE);
        let mouseY = event.offsetY - (event.offsetY % mine_sw.SQUARESIZE);
    
        let mouseX_ratio = mouseX / mine_sw.SQUARESIZE;
        let mouseY_ratio = mouseY / mine_sw.SQUARESIZE;

        if(event.button == 0)
        {
            if(mine_sw.accessibility)
            {
                mine_sw.select(mouseX_ratio, mouseY_ratio);
            }
            else
            {
                mine_sw.l_click(mouseX_ratio, mouseY_ratio);
            }
        }

        if(event.button == 2)
        {
            if(mine_sw.accessibility)
            {
                return;
            }
            else
            {
                mine_sw.r_click(mouseX_ratio, mouseY_ratio);
            }
        }
    });

    document.querySelectorAll(".jeux canvas.affichage_mine ~ .controles button")[0]
            .addEventListener("click", () => 
            {
                let tmp = mine_sw.accessibility;
                mine_sw = new Minesweeper(mine_sw_canvas, mine_sw_ctx);
                mine_sw.accessibility = tmp;
                mine_sw.init_board();
            }
    );

/*
Classe ia 

function minimax(node, depth, maximizingPlayer) is
    if depth = 0 or node is a terminal node then
        return the heuristic value of node
    if maximizingPlayer then
        value := −∞
        for each child of node do
            value := max(value, minimax(child, depth − 1, FALSE))
    else (* minimizing player *)
        value := +∞
        for each child of node do
            value := min(value, minimax(child, depth − 1, TRUE))
    return value
*/


    // /!\Problème de protée les variables n'éxistent plus dans index.php/!\

    // Init minesweeper
    morpion_canvas = document.querySelector("canvas.affichage_morp");
    let morpion_canvas_min = (window.innerWidth < window.innerHeight)? 
                        window.innerWidth: window.innerHeight;
    morpion_canvas.width = 0.7 * morpion_canvas_min;
    morpion_canvas.height = morpion_canvas.width ;
    morpion = new GrilleMorpion(morpion_canvas);
    morpion.draw_grille();

    morpion_canvas.addEventListener("mousedown", (event) =>{
        let mouseX = event.offsetX - (event.offsetX % morpion.SQUARESIZE);
        let mouseY = event.offsetY - (event.offsetY % morpion.SQUARESIZE);
    
        let mouseX_ratio = mouseX / morpion.SQUARESIZE;
        let mouseY_ratio = mouseY / morpion.SQUARESIZE;

        if(morpion.grille[mouseX_ratio][mouseY_ratio] == -1)
        {
            morpion.grille[mouseX_ratio][mouseY_ratio] = 0;
            morpion.draw_cross(mouseX_ratio, mouseY_ratio);

            //gérer IA
        }
    });
});


