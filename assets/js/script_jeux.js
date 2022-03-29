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
    create_grille()
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
                this.create_grille();
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
    init_grille()
    {
        this.context.fillStyle = "#ffffff";
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

        this.create_grille();
    }

    resize()
    {
        let win_min = (window.innerWidth < window.innerHeight)? 
                        window.innerWidth: window.innerHeight;

        this.canvas.width = 0.7 * win_min;
        this.canvas.height = this.canvas.width ;
        
        let font_size = Math.floor(win_min / 20);
        this.context.font = "" + font_size + "px Arial";
        this.context.fillStyle = "#ffffff";

        this.SQUARESIZE = Math.floor(this.canvas.width / this.NB_LIGNES);

        this.init_grille();
    }
}

// Code paint

const black = "#000000";
const white = "#FFFFFF";
const P_SQSIZE = 10;

class Paint
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = black;

        this.P_WIN_RATIO = canvas.height / P_SQSIZE;

        this.pixels = [];
        this.init_pixels();

        this.color = white;

        this.init_listeners();

        this.isDrawing = false;
    }

    init_pixels()
    {
        for(let i = 0; i < this.P_WIN_RATIO; i++){
            this.pixels.push([]);
        }
        this.clear_all();
        this.paint_all();
    }

    paint(x, y, color)
    {
        this.ctx.fillStyle = color;
    
        this.ctx.fillRect(  (x * P_SQSIZE),
                            (y * P_SQSIZE),
                            P_SQSIZE,
                            P_SQSIZE
                         );
    }

    clear_all()
    {
        for(let i = 0; i < this.P_WIN_RATIO; i++){
            for(let ii = 0; ii < this.P_WIN_RATIO; ii++){
                this.paint(i, ii, black);
                this.pixels[i].push([0, black]);
            }
        }
    }

    paint_all(){
        for(let i = 0; i < this.P_WIN_RATIO; i++){
            for(let ii = 0; ii < this.P_WIN_RATIO; ii++){
                if( !(this.pixels[ii] == undefined) && !(this.pixels[ii][i] == undefined)){
                    this.paint(i, ii, this.pixels[ii][i][1]);
                } 
            }
        }
    }

    init_listeners()
    {
        this.canvas.addEventListener("contextmenu", (event) => 
        {
            event.preventDefault();

            let mouseX = event.offsetX - (event.offsetX % P_SQSIZE);
            let mouseY = event.offsetY - (event.offsetY % P_SQSIZE);
        
            let x = mouseX / P_SQSIZE;
            let y = mouseY / P_SQSIZE;

            document.getElementById("paintColor").value = this.pixels[y][x][1];
        });

        this.canvas.addEventListener("mousedown", (event) => {
            if(event.button != 0) return;
            let mouseX = event.offsetX - (event.offsetX % P_SQSIZE);
            let mouseY = event.offsetY - (event.offsetY % P_SQSIZE);
        
            let x = mouseX / P_SQSIZE;
            let y = mouseY / P_SQSIZE;

            let color = document.getElementById("paintColor").value;
            this.paint(x, y, color);
            this.pixels[y][x][0] = 1;
            this.pixels[y][x][1] = color;
            this.isDrawing = true;
        });
        
        this.canvas.addEventListener("mousemove", (event) => {
            if (this.isDrawing === true) {
                let mouseX = event.offsetX - (event.offsetX % P_SQSIZE);
                let mouseY = event.offsetY - (event.offsetY % P_SQSIZE);
            
                let x = mouseX / P_SQSIZE;
                let y = mouseY / P_SQSIZE;

                let color = document.getElementById("paintColor").value;
                this.paint(x, y, color);
                this.pixels[y][x][0] = 1;
                this.pixels[y][x][1] = color;
                this.isDrawing = true;
            }
        });
        
        this.canvas.addEventListener('mouseup', (event) => {
            if (this.isDrawing === true) {
                let mouseX = event.offsetX - (event.offsetX % P_SQSIZE);
                let mouseY = event.offsetY - (event.offsetY % P_SQSIZE);
            
                let x = mouseX / P_SQSIZE;
                let y = mouseY / P_SQSIZE;
                let color = document.getElementById("paintColor").value;
                this.paint(x, y, color);
                this.pixels[y][x][0] = 1;
                this.pixels[y][x][1] = color;
                this.isDrawing = false;
            }
        });

        document.querySelector("canvas.affichage_dessin ~ .controles button")
                   .addEventListener("click", () => {
                        this.clear_all();
                   });
    }

    resize()
    {
        let win_min = (window.innerWidth < window.innerHeight)? 
                        window.innerWidth: window.innerHeight;

        this.canvas.width = 0.7 * win_min;
        this.canvas.height = paint_canvas.width;

        this.P_WIN_RATIO = this.canvas.height / P_SQSIZE;

        this.paint_all();
    }
}



// Code morpion
const M_OFS = 5;

class GrilleMorpion
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 5;
        this.grille = [];
        this.init_grille();
        this.SQUARESIZE = this.canvas.width / 3;
        this.MORE_MOVES_LEFT = 5;
        this.J = 1;
        this.IA = -1;
    }

    init_grille()
    {
        this.grille = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; 
    }

    draw_cross(x, y)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(x * this.SQUARESIZE + M_OFS, y * this.SQUARESIZE + M_OFS);
        this.ctx.lineTo((x + 1) * this.SQUARESIZE - M_OFS, (y + 1) * this.SQUARESIZE - M_OFS);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo( (x + 1) * this.SQUARESIZE - M_OFS, y * this.SQUARESIZE + M_OFS);
        this.ctx.lineTo(x * this.SQUARESIZE + M_OFS, (y + 1) * this.SQUARESIZE - M_OFS);
        this.ctx.stroke();
    }

    draw_circle(x, y)
    {
        this.ctx.beginPath();
        this.ctx.arc(x * this.SQUARESIZE + (this.SQUARESIZE / 2), 
                     y * this.SQUARESIZE + (this.SQUARESIZE / 2), 
                     this.SQUARESIZE/2 - M_OFS, 
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
                    case -1:
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

    clear_grille()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    test_if_finished(grille)
    {
        // column
        for(let i = 0; i < 3; i++)
        {
            if
            ( 
                (grille[i][0] == grille[i][1]) && 
                (grille[i][0] == grille[i][2]) && 
                (grille[i][0] != 0)
            )
            {
                return grille[i][0];
            }
        }
        // row
        for(let i = 0; i < 3; i++)
        {
            if
            ( 
                (grille[0][i] == grille[1][i]) && 
                (grille[0][i] == grille[2][i]) && 
                (grille[0][i] != 0) 
            )
            {
                return grille[0][i];
            }
        }
        // diag
        if
        ( 
            (grille[0][0] == grille[1][1]) && 
            (grille[1][1] == grille[2][2]) && 
            (grille[0][0] != 0)
        )
        {
            return grille[0][0];
        }

        if
        ( 
            (grille[2][0] == grille[1][1]) && 
            (grille[2][0] == grille[0][2]) && 
            (grille[2][0] != 0)
        )
        {
            return grille[2][0];
        }

        for(let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++) 
            {
                // Il reste des coups a jouer
                if(grille[i][j] == 0) return this.MORE_MOVES_LEFT;
            }
        }

        // Egalite
        return 0;
    }

    all_possible_moves(grille, player)
    { 
        let res = [];
        for(let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if(grille[i][j] == 0)
                {
                    let tmp = [];
                    tmp[2] = [...grille[2]];
                    tmp[1] = [...grille[1]];
                    tmp[0] = [...grille[0]];
                    tmp[i][j] = player;
                    res.push(tmp);
                }   
            }
        }
        return res;
    }

    evaluate_for_ai(grille)
    {
        let res = this.test_if_finished(grille);
        if(res == this.IA) return +100;
        if(res == this.J) return -100;
        
        return res;
    }

    minimax(grille, player)
    {
        let end = this.evaluate_for_ai(grille);
        if(end != this.MORE_MOVES_LEFT)
        {
            return end;
        }

        let moves = this.all_possible_moves(grille, player);
        let len = moves.length;

        if (player == this.IA)
        {
            let heuristic = -1000;
            for(let i = 0; i < len; i++)
            {
                heuristic = Math.max(heuristic, this.minimax(moves[i], this.J));
            }
            return heuristic;
        }
        else
        {
            let heuristic = 1000;
            for(let i = 0; i < len; i++)
            {
                heuristic = Math.min(heuristic, this.minimax(moves[i], this.IA));
            }
            return heuristic;
        }
    }

    ai_move(grille)
    {
        let end = this.test_if_finished(grille);
        if(end == 0)
        {
            return grille;
        }

        let heuristic = -1500;
        let moves = this.all_possible_moves(grille, this.IA);
        let len = moves.length;

        let move_index = -1;
        for(let i = 0; i < len; i++)
        {
            let tmp = this.minimax(moves[i], this.J);
            if(tmp > heuristic)
            {
                heuristic = tmp;
                move_index = i;
            }
        }
        return moves[move_index];
    }

    resize()
    {
        let win_min = (window.innerWidth < window.innerHeight)? 
                        window.innerWidth: window.innerHeight;

        this.canvas.width = 0.7 * win_min;
        this.canvas.height = paint_canvas.width;

        this.SQUARESIZE = this.canvas.width / 3;

        //this.clear_grille();
        this.draw_grille();
    }
}


// Minesweeper var
let mine_sw_canvas, mine_sw, minesw_access, mine_sw_ctx;

// Paint var
let paint_canvas, paint;

// Morpion var
let morpion, morpion_canvas;

document.addEventListener("DOMContentLoaded", function() {
    let win_min = (window.innerWidth < window.innerHeight)? 
                        window.innerWidth: window.innerHeight;

    // Init duck petting
    document.querySelectorAll("img")[0].addEventListener("click", pet_duck);

    // Init minesweeper
    mine_sw_canvas = document.querySelector(".jeux canvas");
    mine_sw_canvas.width = 0.7 * win_min;
    mine_sw_canvas.height = mine_sw_canvas.width ;
    
    let font_size = Math.floor(win_min / 20);

    mine_sw_ctx = mine_sw_canvas.getContext("2d");
    mine_sw_ctx.font = "" + font_size + "px Arial";
    mine_sw_ctx.fillStyle = "#c18bdb";

    mine_sw = new Minesweeper(mine_sw_canvas, mine_sw_ctx);
    mine_sw.init_grille();

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
                mine_sw.init_grille();
            }
    );

    paint_canvas = document.querySelector("canvas.affichage_dessin");
    paint_canvas.width = 0.7 * win_min;
    paint_canvas.height = paint_canvas.width;
    paint = new Paint(paint_canvas);

    // Init morpion
    morpion_canvas = document.querySelector("canvas.affichage_morp");
    morpion_canvas.width = 0.7 * win_min;
    morpion_canvas.height = morpion_canvas.width ;
    morpion = new GrilleMorpion(morpion_canvas);
    morpion.draw_grille();

    morpion_canvas.addEventListener("mousedown", (event) =>{
        event.preventDefault();
        let mouseX = event.offsetX - (event.offsetX % morpion.SQUARESIZE);
        let mouseY = event.offsetY - (event.offsetY % morpion.SQUARESIZE);
    
        let mouseX_ratio = mouseX / morpion.SQUARESIZE;
        let mouseY_ratio = mouseY / morpion.SQUARESIZE;

        if(morpion.grille[mouseX_ratio][mouseY_ratio] == 0)
        {
            morpion.grille[mouseX_ratio][mouseY_ratio] = morpion.J;

            //gérer IA
            morpion.grille = JSON.parse(JSON.stringify( morpion.ai_move(morpion.grille) ));
            morpion.draw_grille();
        }
    });

    document.querySelector("canvas.affichage_morp ~ .controles button")
            .addEventListener("click", () =>
            {
                morpion.init_grille();
                morpion.clear_grille();
                morpion.draw_grille();
            });
    
    // Responsiveness
    // Fonctionne mal car la page en elle meme repond mal aux resizing
    window.addEventListener("resize", () => {
        mine_sw.resize();
        paint.resize();
        morpion.resize();
    })
});


