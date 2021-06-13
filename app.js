function load_images(){
    virus_image=new Image;   //javascript object
    virus_image.src="Images/virus1.png";
    player_image=new Image;
    player_image.src="Images/boy.png";
    vaccine_image=new Image;
    vaccine_image.src="Images/syringe.png";
    health_image=new Image;
    health_image.src="Images/life.png";
}

//add movement to the bird
function init(){
    // DOM Tree Traversal to find an element
    canvas=document.getElementById("canvas");
    console.log(canvas);
    //change height and width of the canvas
    H=530;
    W=1300;
    canvas.width=W;
    canvas.height=H;
    //to draw on canvas
    pen=canvas.getContext("2d");
    console.log(pen)
    // we want to create a box
    //JSON Objects
    c1={
        x: 300,
        y: 10,
        w: 60,
        h: 60,
        speed:30
    };
    c2={
        x: 500,
        y: 50,
        w: 70,
        h: 70,
        speed:40
    };
    c3={
        x: 700,
        y: 20,
        w: 80,
        h: 80,
        speed:50
    };
    c4={
        x: 900,
        y: 150,
        w: 90,
        h: 90,
        speed:60
    };  
    corona=[c1,c2,c3,c4];  

    player={
        x: 20,
        y: H/2,
        w: 100,
        h: 100,
        speed: 30,
        moving: false
    };
    vaccine={
        x: W-150,
        y: H/2,
        w: 100,
        h: 100,
    };
    score=0;
    health1={
        x:120,
        y:55,
        w:15,
        h:15
    }
    health2={
        x:140,
        y:55,
        w:15,
        h:15
    }
    health3={
        x:160,
        y:55,
        w:15,
        h:15
    }
    health=[health1,health2,health3];
    health_count=3;
    game_over=false;
    //Create an event listner
    document.addEventListener('keydown',function(e){
        console.log("Pressed");
        console.log(e);
        player.moving=true;
        if(e.key==="ArrowRight")
            flag=0;
        if(e.key==="ArrowLeft")
            flag=1;
    });
    document.addEventListener('keyup',function(e){
        console.log("released");
        console.log("e")
        player.moving=false;
    });
}
function iscollison(b1,b2){
    if(Math.abs(b1.x - b2.x)<=40 && Math.abs(b1.y-b2.y)<=40){
        return true;
    }
    return false;
}
//Game Loop
function draw(){
    //clear the old screen(entire area)
    pen.clearRect(0,0,W,H);
    //Draw this bird on the screen
    pen.fillStyle="Black";
    pen.font="25px Verdana";
    pen.fillText("Score:"+score,20,30);
    pen.fillText("Health:",20,70);
    for(let i=0;i<health.length;i++){
        pen.drawImage(health_image,health[i].x,health[i].y,health[i].w,health[i].h);
    }
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);

    pen.drawImage(vaccine_image,vaccine.x,vaccine.y,vaccine.w,vaccine.h)

    for(let i=0;i<corona.length;i++)
        pen.drawImage(virus_image,corona[i].x,corona[i].y,corona[i].w,corona[i].h);
    
}

function update(){
    if(player.moving==true){
        if(flag===0){
            player.x+=player.speed;
            score+=20;
        }
        else if(flag===1){
            player.x-=player.speed;
            score-=20;
        }
    }

    for(let i=0;i<corona.length;i++){
        corona[i].y+=corona[i].speed;
        if(corona[i].y+corona[i].h>H || corona[i].y<0){
            corona[i].speed*=-1;
        }
    }
    for(let i=0;i<corona.length;i++){
        if(iscollison(player,corona[i])===true){
            health[health_count-1].y+=H+100;
            health_count-=1;
            score=80;
            player.x=100;
            if(health_count===0){
                game_over=true;
                alert("Game Over");
                score=0;
                player.x=20;
            }
        }
    }

    if(iscollison(player,vaccine)===true){
        game_over=true;
        alert("You Win");
    }

}

function gameloop(){
    if(game_over===true)
        clearInterval(f);
    draw();
    update();
    console.log("In gameloop");
}
//Start of the game
load_images();
init();
//repeated call gameloop
var f=setInterval(gameloop,100);
