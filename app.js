function load_images(){
    virus_image=new Image;
    virus_image.src="Images/virus1.png";
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
    bird={
        x: 250,
        y: 10,
        w: 60,
        h: 60,
        speed:30
    };    
}
//Game Loop
function draw(){
    //clear the old screen(entire area)
    pen.clearRect(0,0,W,H);
    //Draw this bird on the screen
    pen.fillStyle="red";
    pen.drawImage(virus_image,bird.x,bird.y,bird.w,bird.h);
}

function update(){
    bird.y+=bird.speed;
    if(bird.y+bird.h>H || bird.y<0){
        bird.speed*=-1;
    }

}

function gameloop(){
    draw();
    update();
    console.log("In gameloop");
}
//Start of the game
load_images();
init();
//repeated call gameloop
setInterval(gameloop,100);