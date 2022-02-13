




// Code double pendule
function Particule(x, y, m, color){

    //x et y sont la position, m la masse
    this.x = x;
    this.y = y;
    this.rad = 15;
    this.m = m;

    //velocity
    this.v = 0;

    // angle
    this.a = Math.random() + 2;

    //couleur
    this.color = color;
}

function DoublePendulum(canvas, context)
{
    this.canvas = canvas;
    this.ctx = context;

    this.canvasMinSize = (this.canvas.height < this.canvas.width)? 
                          this.canvas.height: this.canvas.width;

    this.p1 = new Particule(0, 0, this.canvasMinSize/20, "#7BA86A");
    this.p2 = new Particule(0, 0, this.canvasMinSize/20, "#48A8A0");
    this.r1 = this.canvasMinSize/6;
    this.r2 = this.r1;

    this.g = this.canvasMinSize/1000;

    this.drawnPoints = new Array();

    this.isAnimated = false;

    this.intervalID = null;

    this.drawParticle = function(p)
    {
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color
        this.ctx.arc(p.x, p.y, p.rad, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    this.calculDeplacements = function()
    {
        let num1 = -this.g * (2 * this.p1.m + this.p2.m) * Math.sin(this.p1.a);
        let num2 = -this.p2.m * this.g * Math.sin(this.p1.a - (2 * this.p2.a));
        let num3 = -2 * Math.sin(this.p1.a - this.p2.a) * this.p2.m;
        let num4 = this.p2.v * this.p2.v * this.r2 + this.p1.v * this.p1.v * this.r1 * Math.cos(this.p1.a - this.p2.a);
        let den = this.r1 * (2 * this.p1.m + this.p2.m - this.p2.m * Math.cos(2 * this.p1.a - 2 * this.p2.a));
        let a1_a = (num1 + num2 + num3 * num4) / den;
    
        num1 = 2 * Math.sin(this.p1.a - this.p2.a);
        num2 = this.p1.v * this.p1.v * this.r1 * (this.p1.m + this.p2.m);
        num3 = this.g * (this.p1.m + this.p2.m) * Math.cos(this.p1.a);
        num4 = this.p2.v * this.p2.v * this.r2 * this.p2.m * Math.cos(this.p1.a - this.p2.a);
        den = this.r2 * (2 * this.p1.m + this.p2.m - this.p2.m * Math.cos(2 * this.p1.a - 2 * this.p2.a));
        let a2_a = (num1 * (num2 + num3 + num4)) / den;
    
        this.p1.x = this.r1 * Math.sin(this.p1.a) + this.canvas.width/2;
        this.p1.y = this.r1 * Math.cos(this.p1.a) + this.canvas.height/3;
    
        this.p2.x = this.p1.x + this.r2 * Math.sin(this.p2.a);
        this.p2.y = this.p1.y + this.r2 * Math.cos(this.p2.a);
    
        this.p1.v += a1_a;
        this.p2.v += a2_a;
    
        this.p1.a += this.p1.v;
        this.p2.a += this.p2.v;
    }

    this.init_double_pendulum = function()
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
        d_pendulum.intervalID = setInterval(function(){
            d_pendulum.calculDeplacements();
    
            d_pendulum.ctx.fillStyle = "#F58682"
            d_pendulum.ctx.fillRect(0,0,d_pendulum.canvas.width, d_pendulum.canvas.height);
    
            for(let i = 0; i < d_pendulum.drawnPoints.length; i++){
                d_pendulum.ctx.beginPath();
                d_pendulum.ctx.arc(d_pendulum.drawnPoints[i][0], d_pendulum.drawnPoints[i][1], 1, 0, Math.PI * 2, true); 
                d_pendulum.ctx.stroke();
            }
            d_pendulum.ctx.beginPath();
            d_pendulum.ctx.moveTo(d_pendulum.p2.x, d_pendulum.p2.y);
            d_pendulum.ctx.lineTo(d_pendulum.p1.x, d_pendulum.p1.y);
            d_pendulum.ctx.closePath();
            d_pendulum.ctx.stroke();
    
            d_pendulum.ctx.beginPath();
            d_pendulum.ctx.moveTo(d_pendulum.p1.x, d_pendulum.p1.y);
            d_pendulum.ctx.lineTo(d_pendulum.canvas.width/2, d_pendulum.canvas.height/3);
            d_pendulum.ctx.closePath();
            d_pendulum.ctx.stroke();
    
            d_pendulum.drawParticle(d_pendulum.p1);
            d_pendulum.drawParticle(d_pendulum.p2);
    
            d_pendulum.drawnPoints.push([d_pendulum.p2.x, d_pendulum.p2.y]);
        }, 14);
    }
}

// Init double pendule
canvas = document.getElementById("affichage_pendule");
canvas.width = 0.95 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
ctx = canvas.getContext("2d");

function d_pendule_reset(d_pendule)
{
    d_pendule.drawnPoints.splice(0, d_pendule.drawnPoints.length);
    clearInterval(d_pendule.intervalID);
    d_pendule.isAnimated = false;
    d_pendule.p1 = new Particule(0, 0, this.canvas.height/20, "#7BA86A");
    d_pendule.p2 = new Particule(0, 0, this.canvas.height/20, "#48A8A0");

    d_pendule.init_double_pendulum();
}

var d_pendule = new DoublePendulum(canvas, ctx);
d_pendule.init_double_pendulum();